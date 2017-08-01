import React, { Component } from 'react';
import Pascal from './components/Pascal';
import Info from './components/Info';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showInfo: false,
      canvasWidth: window.innerWidth - 20,
      canvasHeight: window.innerHeight - 90,
    };

    this.updateDimensions = this.updateDimensions.bind(this);
    this.showInfoToggle = this.showInfoToggle.bind(this);
  }
  showInfoToggle() {
    this.setState((previousState) => ({
      showInfo: !previousState.showInfo,
    }));
  }
  updateDimensions() {
    const w = window;
    const d = document;
    const documentElement = d.documentElement;
    const body = d.getElementsByTagName('body')[0];
    const width = w.innerWidth || documentElement.clientWidth || body.clientWidth;
    const height = w.innerHeight|| documentElement.clientHeight|| body.clientHeight;

    this.setState({ canvasWidth: width - 20, canvasHeight: height - 90 });
  }
  render() {
    return (
      <div className="App">
        <Pascal height={this.state.canvasHeight} width={this.state.canvasWidth} />
        <div className="info" onClick={this.showInfoToggle}>
          {this.state.showInfo ? <Info /> : 'What is this?'}
        </div>
      </div>
    );
  }

  componentWillMount() {
    this.updateDimensions();
  }
  componentDidMount() {
    window.addEventListener("resize", this.updateDimensions);
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions);
  }
}

export default App;
