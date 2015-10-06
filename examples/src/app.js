'use strict';

var React = require('react/addons');
const LineBreathPacer = require('marut').LineBreathPacer;
const CircleBreathPacer = require('marut').CircleBreathPacer;
const RectangleBreathPacer = require('marut').RectangleBreathPacer;
const ImageBreathPacer = require('marut').ImageBreathPacer;
const DeepLinkState = require('./mixins/DeepLinkState');
import {Input, Grid, Row, Col} from 'react-bootstrap';
const howler = require('howler');
// const CircleBreathPacer = require('components/CircleBreathPacer')
// const RectangleBreathPacer = require('components/RectangleBreathPacer')

// CSS
require("jquery");
require("bootstrap-webpack");
var imageURL = require('./images/yeoman.png')

require('./styles/main.css');


var MarutTestApp = React.createClass({
  mixins: [DeepLinkState],
  getInitialState() {
    return {
      playSounds:false,
      inhaleDuration: 4,
      inhaleHoldDuration: 1,
      exhaleDuration: 6,
      exhaleHoldDuration: 1,
      CircleBreathPacer : {
        startDiameter :50,
        endDiameter :300,
      },
      CircleBreathPacerAdvanced : {
        startDiameter :10,
        endDiameter :100,
        onInhale(state){
          console.log('CircleBreathPacerAdvanced inhale', state);
          if(this.playSounds){
            new howler.Howl({
              urls: ['http://soundjax.com/reddo/92132%5Egonghi.mp3']
            }).play();
          }
        },
        onInhaleHold(state){
          console.log('CircleBreathPacerAdvanced inhaleHold', state);
        },
        onExhale(state){
          console.log('CircleBreathPacerAdvanced exhale', state);
          if(this.playSounds){
            new howler.Howl({
              urls: ['http://soundjax.com/reddo/92132%5Egonghi.mp3']
            }).play();
          }
        },
        onExhaleHold(state){
          console.log('CircleBreathPacerAdvanced exhaleHold', state);
        },
      },
      ImageBreathPacer : {
        imageUrl:'http://data3.whicdn.com/images/11017150/large.jpg',
        // imageUrl:'http://www.vikraman.com/dubai/images/white_hanumanji.jpg',
        startDiameter :50,
        endDiameter :300,
      },
      RectangleBreathPacer : {
        width :50,
        height :300,
      }
    };
  },
  render: function() {
    var exampleWrap = {
      display:'inline-block'
    }

    let exampleCallbacks = 
    `
    onInhale(state){
      new howler.Howl({
        urls: ['http://soundjax.com/reddo/92132%5Egonghi.mp3']
      }).play();
    },
    onInhaleHold(state){
    },
    onExhale(state){
      new howler.Howl({
        urls: ['http://soundjax.com/reddo/92132%5Egonghi.mp3']
      }).play();
    },
    onExhaleHold(state){
    }
    `
    return (
      <div className='main'>

        <Grid>
        <h1>Marut Meditation Components</h1>
        <p>ReactJS based library of meditation related components for research and practice</p>
        <h2>Breathing Pacer Components</h2>
        <p>Set of components that provide visual guides for breathing excercises.</p>
        <h4>Props common to all BreathPacer components:</h4>
        <ul>
          <li><code>inhaleDuration</code> (Integer) <small>Length of inhale in seconds</small></li>
          <li><code>inhaleHoldDuration</code> (Integer) <small>Length of pause after inhale in seconds</small></li>
          <li><code>exhaleDuration</code> (Integer) <small>Length of exhale in seconds</small></li>
          <li><code>exhaleHoldDuration</code> (Integer) <small>Length of pause after exhale in seconds</small></li>
          <li><code>onInhale</code> (Function) <small>Called at start of inhale </small></li>
          <li><code>onInhaleHold</code> (Function) <small>Called at start of inhaleHold </small></li>
          <li><code>onExhale</code> (Function) <small>Called at start of exhale </small></li>
          <li><code>onExhaleHold</code> (Function) <small>Called at start of exhaleHold </small></li>
        </ul>
        <h3>Common Props</h3>
          
          <Input type="number" label="inhaleDuration" valueLink={this.linkState('inhaleDuration')} />

          <Input type="number" label="inhaleHoldDuration" valueLink={this.linkState('inhaleHoldDuration')} />

          <Input type="number" label="exhaleDuration" valueLink={this.linkState('exhaleDuration')} />

          <Input type="number" label="exhaleHoldDuration" valueLink={this.linkState('exhaleHoldDuration')} />
       
          <Row id='CircleBreathPacerAdvanced'>
            <Col xs={6} >
              <h3>CircleBreathPacer demo with custom style and sound notifications through callbacks</h3>
              <p>Demonstrates use of callbacks to create sound notifications on inhale and exhale.</p>
              <Input type="checkbox" label="Enable sound notification" checkedLink={this.linkState('playSounds')} />
              <h4>Props:</h4>
                <Input type="number" label='startDiameter' valueLink={this.linkState('CircleBreathPacerAdvanced.startDiameter')} />
                <Input type="number" label='endDiameter' valueLink={this.linkState('CircleBreathPacerAdvanced.endDiameter')} />
              <h4>Passed Callbacks (uses <a href="https://github.com/goldfire/howler.js/">howler.js</a> for audio playback):</h4>
              <pre>
              {exampleCallbacks}
              </pre>
            </Col>
            <Col xs={6} className="example-wrap">
              <CircleBreathPacer className='example' ref='CircleBreathPacerAdvanced' {...this.state.CircleBreathPacerAdvanced} {...this.state} />
            </Col>
          </Row>
          

          <Row id='ImageBreathPacer'>
            <Col xs={6} >
              <h3>ImageBreathPacer</h3>
              <p>Expands and contracts an arbritary image according to set durations</p>
              <h4>Props:</h4>
                <Input type="text" label='imageUrl' valueLink={this.linkState('ImageBreathPacer.imageUrl')} />
            </Col>
            <Col xs={6} >
              <ImageBreathPacer ref='ImageBreathPacer' {...this.state.ImageBreathPacer} {...this.state} />
            </Col>
          </Row>

          <Row id='CircleBreathPacer'>
            <Col xs={6} >
              <h3>CircleBreathPacer</h3>
              <p>Expands and contracts a circle according to set durations</p>
              <h4>Props:</h4>
                <Input type="number" label='startDiameter' valueLink={this.linkState('CircleBreathPacer.startDiameter')} />
                <Input type="number" label='endDiameter' valueLink={this.linkState('CircleBreathPacer.endDiameter')} />
            </Col>
            <Col xs={6} >
              <CircleBreathPacer ref='CircleBreathPacer' {...this.state.CircleBreathPacer} {...this.state} />
            </Col>
          </Row>

          <Row id='RectangleBreathPacer'>
            <Col xs={6} >
              <h3>RectangleBreathPacer</h3>
              <h4>Props:</h4>
              <Input label="width" type="number" valueLink={this.linkState('RectangleBreathPacer.width')} />
              <Input label="height" type="number" valueLink={this.linkState('RectangleBreathPacer.height')} />
            </Col>
            <Col xs={6} >
              <RectangleBreathPacer onInhaleHold={()=>{console.log('tester onhold')}} {...this.state.RectangleBreathPacer}  {...this.state} />
            </Col>
          </Row>

          <Row id='RectangleBreathPacer'>
            <Col xs={6} >
              <h3>LineBreathPacer</h3>
            </Col>
            <Col xs={6} >
              <LineBreathPacer  {...this.state}  />
            </Col>
          </Row>

          
        </Grid>


      </div>
    );
  }
});
React.render(<MarutTestApp />, document.getElementById('content')); 

module.exports = MarutTestApp;