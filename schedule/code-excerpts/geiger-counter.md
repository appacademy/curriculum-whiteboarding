# Geiger Counter

```js
import React from 'react';

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
      newCounts = this.state.counts.concat(booleanVal);
    } else {
      newCounts = this.state.counts.slice(1).concat(booleanVal);
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

    let trueCount = 0;

    for (let i = 0; i < length; i++) {
      if (this.state.counts[i]) trueCount++;
    }

    return trueCount / length;
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
