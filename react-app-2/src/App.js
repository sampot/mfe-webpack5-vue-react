import React from "react";
import { createRoot } from "react-dom/client";

export const App = () => {
  return <div>Hello from the react_app_2.</div>;
};

class AppElement extends HTMLElement {
  constructor() {
    super();
    this.root = null;
  }
  connectedCallback() {
    console.log("react_app_2: connectedCallback");
    const mountPoint = this.attachShadow({ mode: "open" });
    if (!this.root) {
      this.root = createRoot(mountPoint);
    }
    this.root.render(<App />);
  }
  disconnectedCallback() {
    console.log("react_app_2: disconnectedCallback");
  }
}

if (!customElements.get("react-app-2")) {
  customElements.define("react-app-2", AppElement);
}

export { AppElement };

export default App;
