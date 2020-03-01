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
This is implemented with Vue.js.

---

![BooMyLife]()

Notes:
A friend of mine has another project. This is an home automation tool. Same kind of visualization, he can plug things together.
This is implemented with React.js.

---

![DryMoose]()

Notes:
And I also have this project. This is a bot to automate trading. The node editor is used to design a neural network.
This is implemented with Angular. Well actually this is not true, this is also React but let's say it's Angular just to make my point.

---

![3 screenshots]()

Notes:
So 3 different projects, same kind of visualization. We can probably do something to not redo the same work 3 times.
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

## Web Components

Notes:
... Web Components!
During this talk, we won't dig too much into Stencil.
Instead we will see what are the Web Standards around Web Components,
how to use those directly and see how far we can go today in modern browser...
In pure vanilla js!