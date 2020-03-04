import MyElement from './my-element.js';

const template = document.createElement('template');
template.innerHTML = /* HTML */ `
  <style>
    :host {
      background-color: lightblue;
    }

    #name {
      color: var(--name-color);
    }
  </style>
  <h1>Hello, <span id="name"></span>!</h1>
`;

class HelloWorld extends MyElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['name'];
  }

  updateName(name) {
    this.shadowRoot.querySelector('#name').innerHTML = name;
  }
}

customElements.define('hello-world', HelloWorld);
