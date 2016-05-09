'use strict';

var React = require('react');
var tweenState = require('react-tween-state');
var BreathPacerMixin = require('../mixins/BreathPacerMixin');

var RectangleBreathPacer = React.createClass({
  displayName: 'RectangleBreathPacer',

  mixins: [tweenState.Mixin, BreathPacerMixin],
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number
  },
  getDefaultProps: function getDefaultProps() {
    return {
      width: 50,
      height: 100
    };
  },
  getInitialState: function getInitialState() {
    return {
      breathPercent: 10,
      displayText: "CircleBreathPacer"
    };
  },

  _doInhale: function _doInhale() {
    this.tweenState('breathPercent', {
      easing: tweenState.easingTypes.easeInOutLinear,
      duration: this.props.inhaleDuration * 1000,
      endValue: 100,
      onEnd: this.onInhaleHold,
      stackBehavior: tweenState.stackBehavior.DESTRUCTIVE
    });
  },
  _doInhaleHold: function _doInhaleHold() {
    this.interval = setTimeout(this.onExhale, this.props.inhaleHoldDuration * 1000);
  },
  _doExhale: function _doExhale() {
    this.tweenState('breathPercent', {
      easing: tweenState.easingTypes.easeInOutLinear,
      duration: this.props.exhaleDuration * 1000,
      endValue: 0,
      onEnd: this.onExhaleHold,
      stackBehavior: tweenState.stackBehavior.DESTRUCTIVE
    });
  },
  _doExhaleHold: function _doExhaleHold() {
    this.interval = setTimeout(this.onInhale, this.props.exhaleHoldDuration * 1000);
  },
  render: function render() {
    var style = {
      width: this.props.width,
      height: this.props.height,
      background: 'linear-gradient(0deg, #247FCC ' + this.getTweeningValue('breathPercent') + '%, #DBDE7E 0%)'
    };
    return React.createElement(
      'div',
      { className: 'rectangle-breath-pacer-wrap', onClick: this.onInhale, style: style },
      this.props.displayText
    );
  }
});

module.exports = RectangleBreathPacer;
