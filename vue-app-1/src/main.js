import { createApp, defineCustomElement } from "vue";
import App from "./App1.vue";

// Mount function to start up the app
const mount = (el) => {
  const app = createApp(App);
  app.mount(el); // this a function from Vue.
};

class AppWC extends HTMLElement {
  constructor() {
    super();
    this.app = null;
    this.mountPoint = null;
  }
  connectedCallback() {
    console.log("vue_app_1: connectedCallback");
    this.mountPoint = document.createElement("div");
    this.app = createApp(App);
    this.attachShadow({ mode: "open" }).appendChild(this.mountPoint);
    this.app.mount(this.mountPoint);
  }

  disconnectedCallback() {
    console.log("vue_app_1: disconnectedCallback");
    this.app.unmount();
    this.shadowRoot.removeChild(this.mountPoint);
    this.app = null;
    this.mountPoint = null;
  }
}

if (!customElements.get("vue-app-1")) {
  customElements.define("vue-app-1", AppWC);
}

// If we are in development and in isolation, call mount immediately
// if (process.env.NODE_ENV === "development") {
//   const devRoot = document.querySelector("#app");

//   if (devRoot) {
//     mount(devRoot);
//   }
// }

// We are running through container and we should export the mount function
export { mount };
