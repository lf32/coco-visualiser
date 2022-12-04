import './App.css';
import React, { Component } from 'react';
import AudioAnalyser from './components/AudioAnalyser';
import Coco from './components/Coco';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      audio: null
    };

    this.toggleMic = this.toggleMic.bind(this);
  }

  async getMic() {
    const audio = await navigator.mediaDevices.getUserMedia({
      audio: true,
      video: false,
    });

    this.setState({ audio });
  }

  stopMic () {
    this.state.audio.getTracks().forEach(track => track.stop());
    this.setState({ 
      audio: null
    });
  }

  toggleMic () {
    this.state.audio ? this.stopMic() : this.getMic();
  }

  render () {
    return (
    <div className="App">
      <div class="container my-5">
        <h1 class="title is-size-1">Coco Visualiser</h1>
      </div>
      <div className="controls">
        <div>
          { this.state.audio ? <AudioAnalyser audio={this.state.audio}/> : <Coco /> }
        </div>
        <button onClick={this.toggleMic} class={this.state.audio ? 'button is-light is-danger' : 'button is-light is-info'}>
          {this.state.audio ? 'Stop It' : 'Sing for Coco'}
        </button>
      </div>
    </div>
  );
  }
}

export default App;
