import { render, h, defineCustomElement } from "vue";

const button = {
  name: "btn-component",
  render() {
    return h(
      "button",
      {
        id: "btn-primary",
      },
      "Hello from vue3_app_1"
    );
  },
};

const WebButton = defineCustomElement(button);
export { WebButton };
export default button;
