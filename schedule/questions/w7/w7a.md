# Week 7

## Student A

Below are the two questions that you will be asking student B.

### Bad Code

#### Prompt

A junior software engineer at our company wrote the following code.
There are at least four problems with it. What are those problems, and
how would you fix them? Also, what does the component do? And can you
give an example of how it could be used?

Feel free to let the interviewee view the code
[here][distance-code-excerpt].

```js
class DistanceTracker extends React.Component {
  constructor(props) {
    this.state = {
      distanceTravelled: 0,
      speed: 1,
    };
  }

  componentDidMount() {
    this.startTracker();
  }

  startTracker() {
    setTimeout(() => {
      this.updateDistance();
    }, 1000);
  }

  updateDistance() {
    const { distanceTravelled, speed } = this.state;
    const updatedDistance = distanceTravelled + speed;
    console.log(`Before update, distance was: ${this.state.distanceTravelled}`);
    this.setState({
      distanceTravelled: updatedDistance,
    });
    console.log(`After update, distance is: ${this.state.distanceTravelled}`);
  }

  updateSpeed(value) {
    this.setState({
      speed: this.state.speed + value,
    });
  }

  render() {
    const { children, headerText } = this.props;

    return (
      <div>
        <h2>{headerText}</h2>
        <h3>You are moving north at {this.state.speed} feet per second.</h3>
        <h3>You have travelled north {this.state.distanceTravelled} feet so far.</h3>
        <div>
          <button onClick={updateSpeed(1)}>Go Faster</button>
          <button onClick={updateSpeed(-1)}>Go Slower</button>
        </div>
        {children}
      </div>
    );
  }
}
```

#### Solution

It can be tricky to find errors in code without running it. If the
interviewee is having trouble finding the following problems, try to
nudge them in the right direction.

##### The Errors

###### Missing `super`

In the constructor, there should be a call of `super(props);` at the
beginning.

###### Infinite Interval

This one can be hard to spot. The `startTracker` method called in the
`componentDidMount` starts a `setInterval`, but when a component is
unmounted, the interval will remain. To fix this, you would want to
assign the interval so that it could be referenced and cleared later:

```js
startTracker() {
  this.interval = setInterval(() => {...}, 1000);
}

componentWillUnmount() {
  clearInterval(this.interval);
}
```

###### Async State Update

Inside `updateDistance`, we have a console log that depends on the state
after the `this.setState(...)`. Because `setState` is asynchronous, it
may or may not return the correct value. Instead, we should pass it as a
callback like so:

```js
this.setState({...}, () => console.log(...));

```

###### Click Callback

The `onClick` should be a callback, not an invoked function. We should
have something like this `onClick={() => updateSpeed(1)}`.

##### Usage

This component could be used like this:

```js
<DistanceTracker headerText="This is the header">
  <div>This is a child</div>
</DistanceTracker>

```

[distance-code-excerpt]: '../../code-excerpts/distance-tracker.md';

### React – Contrast and Compare

#### Prompt

#### Solution
