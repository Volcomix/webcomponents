export default class MyElement extends HTMLElement {
  constructor() {
    super();
    this._reflectPropertiesToAttributes();
  }

  attributeChangedCallback(attributeName, _oldValue, newValue) {
    const propertyName = camelize(attributeName);
    this[`update${capitalizeFirstLetter(propertyName)}`](newValue);
  }

  _reflectPropertiesToAttributes() {
    this.constructor.observedAttributes.forEach(attributeName => {
      const propertyName = camelize(attributeName);
      Object.defineProperty(this, propertyName, {
        get() {
          return this.getAttribute(attributeName);
        },
        set(value) {
          this.setAttribute(attributeName, value);
        }
      });
    });
  }
}

function camelize(str) {
  return str.replace(/(?:^\w|[A-Z]|\b\w|\s+)/g, function(match, index) {
    if (+match === 0) return ''; // or if (/\s+/.test(match)) for white spaces
    return index === 0 ? match.toLowerCase() : match.toUpperCase();
  });
}

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
