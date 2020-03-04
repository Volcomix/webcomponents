import { helloWorldTemplateId } from './constants.js';

const template = document.querySelector(`#${helloWorldTemplateId}`);

class HelloWorld extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}

customElements.define('hello-world', HelloWorld);
