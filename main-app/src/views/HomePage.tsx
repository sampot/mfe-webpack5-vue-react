class HomePage extends HTMLElement {
  connectedCallback() {
    this.innerHTML = "Home";
  }
}
customElements.define("pn-home", HomePage);

export default HomePage;
