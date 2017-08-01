import React from 'react';
import { pascal, prepareToDraw } from '../lib/pascal';

class Pascal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      blockSize: 2,
      decider: 2,
      matchColor: '#AAAAAA',
      nonMatchColor: '#FF4136',
      loading: false,
    };
    this.handleBlockSizeChange = this.handleBlockSizeChange.bind(this);
    this.handleDeciderChange = this.handleDeciderChange.bind(this);
    this.handleMatchColorChange = this.handleMatchColorChange.bind(this);
    this.handleNonMatchColorChange = this.handleNonMatchColorChange.bind(this);
  }

  handleBlockSizeChange(event) {
    this.setState({
      blockSize: event.target.value ? parseInt(event.target.value, 10) : '',
    }, () => {
      if (this.state.blockSize) {
        this.draw();
      }
    });
  }
  handleDeciderChange(event) {
    this.setState({
      decider: event.target.value ? parseInt(event.target.value, 10) : '',
    }, () => this.draw());
  }
  handleMatchColorChange(event) {
    this.setState({
      matchColor: event.target.value,
    }, () => this.draw());
  }
  handleNonMatchColorChange(event) {
    this.setState({
      nonMatchColor: event.target.value,
    }, () => this.draw());
  }

  draw() {
    const canvas = document.getElementById('cabbage');
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    const maxLines = this.props.width / this.state.blockSize / 2;
    const pascalLines = pascal(maxLines);
    const triangle = prepareToDraw(pascalLines);

    triangle.forEach((line, i) => {
      const startLoc = (this.props.width / 2) - ((i + 1) * this.state.blockSize) + (this.state.blockSize / 2);
      const heightOffset = (i + 1) * this.state.blockSize;
      line.forEach((el, j) => {
        const blockX = startLoc + (j * this.state.blockSize);
        ctx.beginPath();
        ctx.rect(blockX, heightOffset, this.state.blockSize, this.state.blockSize);
        ctx.fillStyle = el % this.state.decider ? this.state.matchColor : this.state.nonMatchColor;
        if (el !== 0) ctx.fill();
      });
    });
  }

  render() {
    return (
      <div>
        <canvas height={this.props.height} width={this.props.width} id="cabbage">
          <p>This App only works if your browser can handle canvas stuff</p>
        </canvas>
        <form autoComplete="off">
          <label htmlFor="blockSize">Block Size:</label>
          <input id="blockSize" value={this.state.blockSize} onChange={this.handleBlockSizeChange} />

          <label htmlFor="decider">Decider:</label>
          <input id="decider" value={this.state.decider} onChange={this.handleDeciderChange} />

          <label htmlFor="matchColor">Match:</label>
          <input id="matchColor" value={this.state.matchColor} onChange={this.handleMatchColorChange} />

          <label htmlFor="nonMatchColor">Non-Match:</label>
          <input id="nonMatchColor" value={this.state.nonMatchColor} onChange={this.handleNonMatchColorChange} />
        </form>
      </div>
    )
  }
  componentDidUpdate(previousProps) {
    // listen for window resizing
    if (previousProps.height !== this.props.height ||
    previousProps.width !== this.props.width) {
      this.draw();
    }
  }
  componentDidMount() {
    this.draw();
  }
}

export default Pascal;
