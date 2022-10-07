import { createApp, defineCustomElement } from "vue";
import App from "./App.vue";

class AppWC extends HTMLElement {
  constructor() {
    super();
    this.app = null;
    this.mountPoint = null;
  }
  connectedCallback() {
    console.log("vue_app_2: connectedCallback");
    this.mountPoint = document.createElement("div");
    this.app = createApp(App, { name: "vue_app_2" });
    this.attachShadow({ mode: "open" }).appendChild(this.mountPoint);
    this.app.mount(this.mountPoint);
  }

  disconnectedCallback() {
    console.log("vue_app_2: disconnectedCallback");
    this.app.unmount();
    this.shadowRoot.removeChild(this.mountPoint);
    this.app = null;
    this.mountPoint = null;
  }
}

if (!customElements.get("vue-app-2")) {
  customElements.define("vue-app-2", AppWC);
}

// Mount function to start up the app
const mount = (el) => {
  const app = createApp(App);
  app.mount(el); // this a function from Vue.
};

// If we are in development and in isolation, call mount immediately
// if (process.env.NODE_ENV === "development") {
//   const devRoot = document.querySelector("#app");

//   if (devRoot) {
//     mount(devRoot);
//   }
// }

// We are running through container and we should export the mount function
export { mount };
