class NotFoundPage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "Not found";
  }
}
customElements.define("pn-not-found", NotFoundPage);

export default NotFoundPage;
