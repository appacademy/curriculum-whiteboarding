# Distance Tracker

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
    setInterval(() => {
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
