type Scope = unknown;
type Factory = () => any;

type Container = {
  init(shareScope: Scope): void;
  get(module: string): Factory;
};

type ContainerMap = { [key: string]: Container };

const containerMap: ContainerMap = {};
const remoteMap: { [key: string]: boolean } = {}; // container initialization statuses.
const fetchingTasks: { [key: string]: Promise<void> } = {};

let defaultScopeInitialized = false;

async function initContainer(container: Container, remoteName: string) {
  if (remoteMap[remoteName]) {
    return container;
  }
  // eslint-disable-next-line no-undef
  await container.init(__webpack_share_scopes__["default"]);
  remoteMap[remoteName] = true;
  return container;
}

async function fetchRemote(url: string, remoteName: string) {
  let task = fetchingTasks[remoteName];
  if (task) {
    return task;
  }

  task = new Promise((resolve, reject) => {
    if (containerMap[remoteName]) {
      resolve();
      return;
    }
    // We define a script tag to use the browser for fetching the remoteEntry.js file
    const script = document.createElement("script");
    script.src = url;
    script.onerror = (err) => {
      reject(new Error(`Failed to fetch remote: ${remoteName}`));
    };
    // When the script is loaded we need to resolve the promise back to Module Federation
    script.onload = () => {
      const container = window[remoteName] as Container;
      // Initialize the remote app
      initContainer(container, remoteName);
      containerMap[remoteName] = container;

      resolve();
    };

    document.head.appendChild(script);
  });

  fetchingTasks[remoteName] = task;

  return task;
}

export async function loadRemoteModule(
  remoteName: string,
  moduleName = "web-components"
) {
  if (!defaultScopeInitialized) {
    // Initializes the shared scope. Fills it with known provided modules from this build and all remotes
    // eslint-disable-next-line no-undef
    await __webpack_init_sharing__("default");
    defaultScopeInitialized = true;
  }

  // Fetch the remote app. We assume our remote app is exposing a `remoteEntry.js` file.
  await fetchRemote(`/apps/${remoteName}/remoteEntry.js`, remoteName);

  // 'container' is the remote app
  const container = window[remoteName] as Container;
  containerMap[remoteName] = container;

  // The module pass to get() must match the "exposes" item in our remote app exactly
  const factory = await container.get(`./${moduleName}`);
  // 'Module' is the module from our remote app's "exposes" configuration
  const mod = factory();
  return mod;
}
