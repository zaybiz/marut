'use strict';

var React = require('react/addons');
var tweenState = require('react-tween-state');

var CircleBreathPacer = React.createClass({
  displayName: 'CircleBreathPacer',

  mixins: [tweenState.Mixin],
  propTypes: {
    startDiameter: React.PropTypes.number,
    endDiameter: React.PropTypes.number,
    inhaleDuration: React.PropTypes.number,
    inhaleHoldDuration: React.PropTypes.number,
    exhaleDuration: React.PropTypes.number,
    exhaleHoldDuration: React.PropTypes.number,
    inhaleText: React.PropTypes.string,
    inhaleHoldText: React.PropTypes.string,
    exhaleText: React.PropTypes.string,
    exhaleHoldText: React.PropTypes.string,
    displayText: React.PropTypes.string
  },
  getDefaultProps: function getDefaultProps() {
    return {
      imageUrl: 'https://lh3.ggpht.com/4SLkEjPPjg1NnoF8F1l65clxWt8oBmOnG5TBwuA9qQ2zMfQjLi0yFpucGaD7PvcKu-MD=w300',
      startDiameter: 50,
      endDiameter: 100,
      inhaleDuration: 4,
      inhaleHoldDuration: 1,
      exhaleDuration: 6,
      exhaleHoldDuration: 1,
      inhaleText: 'Inhale',
      inhaleHoldText: 'Inhale Hold',
      exhaleText: 'Exhale',
      exhaleHoldText: 'ExhaleHold'
    };
  },
  getInitialState: function getInitialState() {
    return {
      circleSize: 50,
      displayText: "CircleBreathPacer"
    };
  },
  componentDidMount: function componentDidMount() {
    this._animateInhale();
  },
  _animateInhale: function _animateInhale() {
    this.setState({
      displayText: this.props.inhaleText
    });
    this.tweenState('circleSize', {
      easing: tweenState.easingTypes.easeInOutLinear,
      duration: this.props.inhaleDuration * 1000,
      endValue: this.props.endDiameter,
      onEnd: this._animateInhaleHold
    });
  },
  _animateInhaleHold: function _animateInhaleHold() {
    this.setState({
      displayText: this.props.inhaleHoldText
    });
    this.interval = setTimeout(this._animateExhale, this.props.inhaleHoldDuration * 1000);
  },
  _animateExhale: function _animateExhale() {
    this.setState({
      displayText: this.props.exhaleText
    });
    this.tweenState('circleSize', {
      easing: tweenState.easingTypes.easeInOutLinear,
      duration: this.props.exhaleDuration * 1000,
      endValue: this.props.startDiameter,
      onEnd: this._animateExhaleHold
    });
  },
  _animateExhaleHold: function _animateExhaleHold() {
    this.setState({
      displayText: this.props.exhaleHoldText
    });
    this.interval = setTimeout(this._animateInhale, this.props.exhaleHoldDuration * 1000);
  },
  render: function render() {
    var innerStyle = {
      width: this.getTweeningValue('circleSize'),
      height: this.getTweeningValue('circleSize'),
      // borderRadius: '50%',
      backgroundColor: '#247FCC',
      margin: 'auto',
      boxSizing: 'content-box',
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)'
    };
    var outerStyle = {
      // border: '10px solid #EA7A58',
      width: this.props.endDiameter,
      height: this.props.endDiameter,
      // borderRadius: '50%',
      backgroundColor: '#DBDE7E',
      textAlign: 'center',
      boxSizing: 'content-box'
    };
    var imageStyle = {
      maxWidth: '100%',
      maxHeight: '100%',
      display: 'inline-block',
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)'

    };
    // var imageUrl = 'https://lh3.ggpht.com/4SLkEjPPjg1NnoF8F1l65clxWt8oBmOnG5TBwuA9qQ2zMfQjLi0yFpucGaD7PvcKu-MD=w300';
    var imageUrl = 'http://www.shreehindutemple.net/wp-content/media/2011/07/hanuman-mantras.jpg';
    return React.createElement(
      'div',
      null,
      this.state.displayText,
      React.createElement(
        'div',
        { style: outerStyle },
        React.createElement(
          'div',
          { style: innerStyle },
          React.createElement('img', { style: imageStyle, src: this.props.imageUrl, alt: '' })
        )
      )
    );
  }
});

module.exports = CircleBreathPacer;