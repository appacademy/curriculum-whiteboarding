# Week 7

## Student A

Below are the two questions that you will be asking student B.

### Bad Code

#### Prompt

A junior software engineer at our company wrote the following code.
There are at least six problems with it. What are those problems, and
how would you fix them? Also, what does the component do? And can you
give an example of how it could be used?

Feel free to let the interviewee view the code
[here][geiger-code-excerpt].

```js
class GeigerCounter extends React.Component {
  constructor() {
    this.state = {
      counts: [false],
      probability: 50,
      maxCountsSize: this.props.maxCountsSize || 30,
    };
  }

  componentDidMount() {
    this.startCounter();
  }

  startCounter() {
    setInterval(() => {
      this.updateCounts();
    }, 1000);
  }

  updateCounts() {
    const booleanVal = this.generateBoolean();

    const newCounts;

    if (this.state.counts.length < this.state.maxCountsSize) {
      newCounts = this.state.counts.concat([booleanVal]);
    } else {
      newCounts = this.state.counts.slice(1).concat([booleanVal]);
    }

    this.setState({ counts: newCounts });
    console.log(this.state.counts.length);
  }

  generateBoolean() {
    const floatProbability = this.state.probability / 100.0;
    const randFloat = Math.random();

    return randFloat < floatProbability;
  }

  geigerValue() {
    const { length } = this.state.counts;

    const trueCounts = 0;

    for (let i = 0; i < length; i++) {
      if (this.state.counts[i]) trueCounts++;
    }

    return trueCounts / length;
  }

  updateProbability(value) {
    const newValue = this.state.probability + value;
    if (newValue >= 0 && newValue <= 100) {
      this.setState({ probability: newValue });
    }
  }

  render() {
    return (
      <div>
        <p>
          The radiation level is currently: <strong>{this.geigerValue()}</strong>
        </p>
        <small>
          The current radiation level is at {this.state.probability}%
        </small>

        <br />

        <button onClick={this.updateProbability(-1)}>Decrease Radiation</button>
        <button onClick={this.updateProbability(1)}>Increase Radiation</button>
      </div>
    );
  }
}
```

[geiger-code-excerpt]: ../../code-excerpts/geiger-counter.md

#### Solution

It can be tricky to find errors in code without running it. If the
interviewee is having trouble finding the following problems, try to
nudge them in the right direction.

##### The Errors

###### Missing `super`

In the constructor, there should be a call of `super(props);` at the
beginning. There should also be `props` passes in to the constructor.

###### Inappropriate `const`

In the `updateCounts` function, we are using `const newCounts;`, but
it's conditionally assigned a value in the lines that follow that
declaration. Use `let` instead!

###### Infinite Interval

This one can be hard to spot. The `startCounter` method called in the
`componentDidMount` starts a `setInterval`, but when a component is
unmounted, the interval will remain. To fix this, you would want to
assign the interval so that it could be referenced and cleared later:

```js
startCounter() {
  this.interval = setInterval(() => {...}, 1000);
}

componentWillUnmount() {
  clearInterval(this.interval);
}
```

###### Async State Update

Inside `updateCounts`, we have a console log that depends on the state
after the `this.setState(...)`. Because `setState` is asynchronous, it
may or may not return the correct value. Instead, we should pass it as a
callback like so:

```js
this.setState({...}, () => console.log(...));
```

###### Click Callback

Each `onClick` should be a callback, not an invoked function. We should
have something like this `onClick={() => this.updateProbability(1)}`.

Alternatively, you could rework the `updateProbability` function to
return a function. In that case, you would want to bind
`updateProbability` so that `this` is the appropriate context.

###### Missing Bind

Because we are directly invoking `this.geigerValue` in the render
function, we should make sure it is properly bound. Add the following
to your constructor:

```js
this.geigerValue = this.geigerValue.bind(this);
```

##### Usage

This component could be used like this:

```js
<GeigerCounter maxCountsSize={60} />
```

### React – Contrast and Compare

#### Prompt

Other front-end frameworks and libraries exist. What are some examples
of these, and how does React compare/contrast with those?

#### Solution

##### jQuery

Like React, jQuery is a library, not a framework. It is the most popular
JavaScript library in use. It wraps up many common vanilla JavaScript
functions and initially gained popularity because it is guaranteed to
behave identically on any browser.

A key contrast: the components rendered by React are a pure function of
the React state, i.e. props and component state. Thus a React developer
only has to think about the state of his app. On the other hand, jQuery
primarily allows you to directly manipulate the DOM, meaning that it is
up to the programer to keep the DOM in sync with the internal state of
an app.

##### Vue

Vue is another front-end library. Like react it uses a virtual DOM and
composable components. Vue's virtual DOM is lighter weight than React,
and Vue is significantly faster, however Vue's developer community is
much smaller than React's, so Vue has a smaller ecosystem of libraries
and plugins.

##### Angular

Angular was initially released in 2009 and is maintained by Google and a
community of developers. It is part of the MEAN stack: the MongoDB
database, Express.js server, Angular.js, and Node.js.

Angular is a framework, not a library like React, and implements a MVVM
framework (Model-View-ViewModel). As a result, it offers perhaps more
functionality out of the box than React. However, it also takes much
more time to master and is criticized in some corners for its lack of
flexibility. Angular 1.0 also struggled to handle larger amounts of
data. With the release of Angular 2.0, its ability to render large
amounts of data in the browser has increased. However, it still loses
out to React in terms of performance.

##### Ember

Like Angular, Ember is a framework and not just a library. It has a
number of customizations that can be added to the app from the Ember CLI
(an idea the Ember team took from Rails!), as well as built in testing
tools. However, it doesn't have a particularly large core team so
development is slow. The community, while vibrant, doesn't produce as
many add-ons. Also, because Ember is a framework, it's harder to
customize.

##### React Native

React Native allows developers to write React apps in javascript and run
them on mobile devices. It was released by Facebook and is also used by
companies like AirBnB and Instagram. It is currently supported by iOS
and Android. Microsoft also has plans to start supporting React Native
apps on Windows devices.
