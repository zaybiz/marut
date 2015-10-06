var React = require('react/addons');
var tweenState = require('react-tween-state');
var BreathPacerMixin = require('../mixins/BreathPacerMixin')

const RectangleBreathPacer = React.createClass({
  mixins: [tweenState.Mixin, BreathPacerMixin],
  propTypes: {
    width: React.PropTypes.number,
    height: React.PropTypes.number,
  },
  getDefaultProps() {
    return {
      width: 50,
      height: 100,
    };
  },
  getInitialState() {
    return {
      breathPercent: 10,
      displayText: "CircleBreathPacer"
    };
  },

  _doInhale() {
    this.tweenState('breathPercent', {
      easing: tweenState.easingTypes.easeInOutLinear,
      duration: this.props.inhaleDuration * 1000,
      endValue: 100,
      onEnd: this.onInhaleHold,
      stackBehavior: tweenState.stackBehavior.DESTRUCTIVE
    });
  },
  _doInhaleHold() {
    this.interval = setTimeout(this.onExhale, this.props.inhaleHoldDuration * 1000);
  },
  _doExhale() {
    this.tweenState('breathPercent', {
      easing: tweenState.easingTypes.easeInOutLinear,
      duration: this.props.exhaleDuration * 1000,
      endValue: 0,
      onEnd: this.onExhaleHold,
      stackBehavior: tweenState.stackBehavior.DESTRUCTIVE
    });
  },
  _doExhaleHold() {
    this.interval = setTimeout(this.onInhale, this.props.exhaleHoldDuration * 1000);
  },
  render() {
    var style = {
      width: this.props.width,
      height: this.props.height,
      background: `linear-gradient(0deg, #247FCC ${this.getTweeningValue('breathPercent')}%, #DBDE7E 0%)`
    };
    return (
      <div className="rectangle-breath-pacer-wrap" onClick={this.onInhale} style={style}>{this.props.displayText}</div>
    );
  }
});

module.exports = RectangleBreathPacer;