## Intro

Notes:
Hello, my name is Sébastien and I work at Criteo as a full stack engineer.
I am particularly attracted by UI developments and I spend a lot of time trying to catch up JavaScript evolution.
At work, I develop mostly with Angular but I like learning other libraries, frameworks and I especially like learning how to do tricky stuff in vanilla js.
I think that's a good way to learn what are other standards, how others develop, and gives inspiration and new ideas to use the right solution to a given problem.
That's exactly what I would like to share with you today. Learn some standards, explore some common practices and hopefully this might help when trying to design components for our favorite frameworks.

---

![Waane]()

Notes:
Anyway, I have a personal project. The goal is to bring a visual way to create sounds and then music.
The node editor sticks to the standard API to create sounds, which is the Web Audio API and basically represents sounds with a graph.
This is implemented with Vue.

---

![BooMyLife]()

Notes:
A friend of mine has another project. This is an home automation tool. Same kind of visualization, he can plug things together.
This is implemented with React.

---

![DryMoose]()

Notes:
And I also have this project. This is a bot to automate trading. The node editor is used to design a neural network.
This is implemented with Angular. Well actually this is not true, this is also React but let's say it's Angular just to make my point.

---

![3 screenshots]()

Notes:
So 3 different projects, same kind of visualization...

What can we do?

---

![Material Design]()

Notes:
One possibility is to write a spec...

---

![Material UI]()

Notes:
Implement it 3 times...

---

![Vuetify]()

Notes:
With different implementation and inconsistent decisions...

---

![Angular Material]()

Notes:
And each implementation evolve at its own speed so all are not up to date in the same time regarding the spec.

---

![Bootstrap]()

Notes:
Another possibility is to create a library using JQuery...

---

![React Bootstrap]()

Notes:
And do 3 wrappers...

---

![BootstrapVue]()

Notes:
Removing jQuery 3 times...

---

![ng-bootstrap]()

Notes:
And once again each of those is updated at its own speed.

---

![Ionic Framework]()

Notes:
Or...
You can rely on web standards!
Internally, Ionic rely on Stencil to build components and expose them in a way they can be used with React, Vue and Angular.
These components are exposed in the web standards way called...

---

# Web Components

Notes:
... Web Components!
During this talk, we won't dig too much into Stencil.
Instead we will see what are the Web Standards around Web Components,
how to use those directly and see how far we can go today in modern browser...

In pure vanilla js!

---

## Specifications

- Custom elements <!-- .element: class="fragment highlight-blue" -->
- Shadow DOM
- HTML templates
- ES modules

Notes:
Let's start by the standards. The Web Components consist of 4 specs: Custom elements, shadow DOM, HTML templates,
and sometimes ES modules is also included as being one of the Web Components standards.
We will run into each of those to understand the basics.
Then we will try to implement a real world example and see what are common pitfalls and common practices.

First: custom elements.

---

Autonomous custom elements

```js
class HelloWorld extends HTMLElement {
  connectedCallback() {
    this.innerHTML = '<h1>Hello, world!</h1>';
  }
}

customElements.define('hello-world', HelloWorld);
```

Notes:
With custom elements, web developers can create new HTML tags or customize built-in elements.
As the name implies, custom elements are HTML elements like div, section or article, but something we can name ourselves,
that are defined via a browser API.
When naming a custom element, you have to always put a dash in the name.
Browser vendors have committed not to create new built-in elements containing a dash in their names to prevent conflicts.
So in this example, we extend the standard HTMLElement to create a new class that will contain the semantics, behaviors and markup of our component.
Then we define a tag hello-world that will rely on this class.
By extending HTMLElement, we are creating what is called an "autonomous custom element".
In the connectedCallback lifecycle method, we can access the root of our custom element with the keyword 'this'.
And as for every built-in HTMLElement, we can read and write a lot of properties, like innerHTML in this example.

---

```html
<body>
  <hello-world></hello-world>

  <script>
    class HelloWorld extends HTMLElement {
      connectedCallback() {
        this.innerHTML = '<h1>Hello, World!</h1>';
      }
    }

    customElements.define('hello-world', HelloWorld);
  </script>
</body>
```

Notes:
Now to use this new custom element, we can just write the tag hello-world in the body of our HTML page and...

---

![Screenshot 1](assets/example1.png)

Notes:
...that's it!
The innerHTML has been updated with our "Hello, World!" message.

What happened exactly...

---

```html
<hello-world></hello-world>

<script>
  class HelloWorld extends HTMLElement {
    connectedCallback() {
      this.innerHTML = '<h1>Hello, World!</h1>';
    }
  }

  customElements.define('hello-world', HelloWorld);
</script>
```

Notes:
You might have noticed that our custom element is defined after being referenced in the html code.
Basically, what happened is that the browser tried first to render this tag as an empty inline element,
then the custom element was defined and the connectedCallback was executed, which rendered the "Hello, World!" message.
This process is called is called "element upgrade" and allows "progressive enhancement".
This can be usefull when async work has to be made before rendering your element, and yet having something rendered during this time.

---

Progressive enhancement

```html
<hello-world>Loading...</hello-world>

<script>
  setTimeout(() => {
    class HelloWorld extends HTMLElement {
      connectedCallback() {
        this.innerHTML = '<h1>Hello, World!</h1>';
      }
    }

    customElements.define('hello-world', HelloWorld);
  }, 1000);
</script>
```

Notes:
For example, if we put a content inside the hello-world tag, it will be rendered while the custom elements is being defined,
and then its innerHTML will be overridden by the "Hello, World!" message.

---

![Clip 1](assets/example2.gif)

Notes:
In action!

Impressive right?

---

## Lifecycle hooks

- constructor
- connectedCallback
- disconnectedCallback
- attributeChangedCallback(attrName, oldVal, newVal)
- adoptedCallback

Notes:
When implementing a custom element, you can define special lifecycle hooks.

- constructor is called when an instance of an element is created or upgraded.
- connectedCallback is called every time the element is inserted into the DOM.
- disconnectedCallback is called every time the element is removed from the DOM.
- attributeChangedCallback is called when an observed attribute has been added, removed, updated, or replaced.
  Also called for initial values when an element is created by the parser, or upgraded. Only attributes listed in the observedAttributes property will receive this callback.
- adoptedCallback is called when the custom element has been moved into a new document

---

Customized built-in elements

```js
class CustomizedButton extends HTMLButtonElement {
  ...
}

customElements.define("customized-button", CustomizedButton,
                      { extends: "button" });
```

Notes:
It is also possible to customize built-in elements by extending it rather than extending HTMLElement,
and adding the "extends" option when defining the element.

---

```html
<button is="customized-button">Click Me!</button>

<script>
  class CustomizedButton extends HTMLButtonElement {
    ...
  }

  customElements.define("customized-button", CustomizedButton,
                        { extends: "button" });
</script>
```

Notes:
To add this kind of element in HTML markdown, you can't use it like before, with a customized-button tag.
Instead, you have use a button element with the "is" attribute.

---

![Caniuse custom elements](assets/caniuse-custom-elements.png)

Notes:
As you can see in this figure, autonomous custom elements are currently supported by all major modern browsers.
Only customized built-in elements are not supported by Safari.
