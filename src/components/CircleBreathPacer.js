var React = require('react/addons');
var tweenState = require('react-tween-state');
var BreathPacerMixin = require('../mixins/BreathPacerMixin')

/**
 * Expands and contracts a Circle according to set durations
 */
const CircleBreathPacer = React.createClass({

  mixins: [tweenState.Mixin, BreathPacerMixin],

  propTypes: {
    /**
     * Initial diameter of circle (width at start of inhale)
     */
    startDiameter: React.PropTypes.number,
    /**
     * Final diameter of circle (width at end of exhale)
     */
    endDiameter: React.PropTypes.number,
  },

  getDefaultProps() {
    return {
      startDiameter: 50,
      endDiameter: 100,
    };
  },

  getInitialState() {
    return {
      circleSize: this.props.startDiameter,
    };
  },

  componentWillReceiveProps(){
    this.setState({circleSize:this.props.startDiameter})
  },

  _doInhale() {
    this.tweenState('circleSize', {
      easing: tweenState.easingTypes.easeInOutLinear,
      duration: this.props.inhaleDuration * 1000,
      endValue: this.props.endDiameter,
      onEnd: this.onInhaleHold,
      stackBehavior: tweenState.stackBehavior.DESTRUCTIVE
    });
  },

  _doInhaleHold() {
    this.interval = setTimeout(this.onExhale, this.props.inhaleHoldDuration * 1000);
  },

  _doExhale() {
    this.tweenState('circleSize', {
      easing: tweenState.easingTypes.easeInOutLinear,
      duration: this.props.exhaleDuration * 1000,
      endValue: this.props.startDiameter,
      onEnd: this.onExhaleHold,
      stackBehavior: tweenState.stackBehavior.DESTRUCTIVE
    });
  },

  _doExhaleHold() {
    this.interval = setTimeout(this.onInhale, this.props.exhaleHoldDuration * 1000);
  },

  render() {

    var innerCircleStyle = {
      width: this.getTweeningValue('circleSize'),
      height: this.getTweeningValue('circleSize'),
      borderRadius: '50%',
      backgroundColor: '#247FCC',
      margin: 'auto',
      boxSizing: 'content-box',
      position: 'relative',
      top: '50%',
      transform: 'translateY(-50%)',
    };

    var outerCircleStyle = {
      border: '10px solid #EA7A58',
      width: this.props.endDiameter,
      height: this.props.endDiameter,
      borderRadius: '50%',
      backgroundColor: '#DBDE7E',
      boxSizing: 'content-box',
    };

    return (
      <div className='circle-breath-pacer-wrap'>
        <div className='circle-breath-pacer-outer' style={outerCircleStyle}>
          <div className='circle-breath-pacer-inner' style={innerCircleStyle}></div>
        </div>
      </div>
    );
  }
});

module.exports = CircleBreathPacer;
