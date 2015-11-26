'use strict';

var React = require('react/addons');

module.exports = React.createClass({
  displayName: 'exports',

  getInitialState: function getInitialState() {
    return {
      inhaleDuration: 4,
      inhaleHoldDuration: 1,
      exhaleDuration: 6,
      exhaleHoldDuration: 1
    }
    // return false;
    ;
  },
  settingsChanged: function settingsChanged(e) {
    // console.log(this.refs.inhaleDuration.getDOMNode().value)
    e.preventDefault();
    this.setState({
      inhaleDuration: parseInt(this.refs.inhaleDuration.getDOMNode().value),
      inhaleHoldDuration: parseInt(this.refs.inhaleHoldDuration.getDOMNode().value),
      exhaleDuration: parseInt(this.refs.exhaleDuration.getDOMNode().value),
      exhaleHoldDuration: parseInt(this.refs.exhaleHoldDuration.getDOMNode().value)
    });
  },
  componentDidMount: function componentDidMount() {
    var pacerContainer = this.refs.pacer.getDOMNode();
    var inhaleAnimation = pacerContainer.querySelector('#inhale');
    var exhaleAnimation = pacerContainer.querySelector('#exhale');
    inhaleAnimation.addEventListener('beginEvent', function () {});
    inhaleAnimation.addEventListener('endEvent', function () {});
    // console.log(inhaleAnimation,exhaleAnimation)
  },
  render: function render() {
    var inhaleDuration = this.state.inhaleDuration || 0.001;
    var inhaleHoldDuration = this.state.inhaleHoldDuration || 0.001;
    var exhaleDuration = this.state.exhaleDuration || 0.001;
    var exhaleHoldDuration = this.state.exhaleHoldDuration || 0.001;

    var totalDuration = inhaleDuration + inhaleHoldDuration + exhaleDuration + exhaleHoldDuration;
    var inhaleDurationPercent = inhaleDuration / totalDuration * 100;
    var inhaleHoldDurationPercent = inhaleHoldDuration / totalDuration * 100;
    var exhaleDurationPercent = exhaleDuration / totalDuration * 100;
    var exhaleHoldDurationPercent = exhaleHoldDuration / totalDuration * 100;

    var inhaleStartX = 0;
    var inhaleEndX = inhaleDurationPercent;
    var inhaleHoldStartX = inhaleEndX;
    var inhaleHoldEndX = inhaleEndX + inhaleHoldDurationPercent;
    var exhaleStartX = inhaleHoldEndX;
    var exhaleEndX = inhaleHoldEndX + exhaleDurationPercent;
    var exhaleHoldStartX = exhaleEndX;
    var exhaleHoldEndX = exhaleEndX + exhaleHoldDurationPercent;

    var yTop = 0;
    var yBottom = 100;

    // console.log("TotalDuration",totalDuration);
    // console.log("inhaleDuration",inhaleDuration);
    // console.log("inhaleDurationPercent",inhaleDurationPercent);
    // console.log("inhaleHoldDuration",inhaleHoldDuration);
    // console.log("inhaleHoldDurationPercent",inhaleHoldDurationPercent);
    // console.log("exhaleDuration",exhaleDuration);
    // console.log("exhaleDurationPercent",exhaleDurationPercent);

    // console.log("inhale start/stop",inhaleStartX,inhaleEndX);
    // console.log("exhale start/stop",exhaleStartX,exhaleEndX);
    var breathPacer = '\n      <svg width="100%" height="200"\n        style="padding:30px"\n       xmlns="http://www.w3.org/2000/svg" version="1.1"\n       xmlns:xlink="http://www.w3.org/1999/xlink">\n        <!-- InhaleLine -->\n        <line\n          x1="' + inhaleStartX + '%"\n          y1="' + yBottom + '%"\n          x2="' + inhaleEndX + '%"\n          y2="' + yTop + '%"\n          stroke="black"\n          stroke-width="5"\n        />\n\n        <!-- InhaleHoldLine -->\n        <line\n          x1="' + inhaleHoldStartX + '%"\n          y1="' + yTop + '%"\n          x2="' + inhaleHoldEndX + '%"\n          y2="' + yTop + '%"\n          stroke="black"\n          stroke-width="5"\n        />\n\n        <!-- exhaleLine -->\n        <line\n          x1="' + exhaleStartX + '%"\n          y1="' + yTop + '%"\n          x2="' + exhaleEndX + '%"\n          y2="' + yBottom + '%"\n          stroke="black"\n          stroke-width="5"\n        />\n\n        <!-- exhaleHoldLine -->\n        <line\n          x1="' + exhaleHoldStartX + '%"\n          y1="' + yBottom + '%"\n          x2="' + exhaleHoldEndX + '%"\n          y2="' + yBottom + '%"\n          stroke="black"\n          stroke-width="5"\n        />\n\n        <circle id="orange-circle" r="16" cx="10" cy="10" fill="orange" >\n          <!-- inhale -->\n          <animate\n            attributeName="cx"\n            from="' + inhaleStartX + '%"\n            to="' + inhaleEndX + '%"\n            dur="' + inhaleDuration + 's"\n            id="inhale"\n            begin="0s;exhaleHold.end"\n          />\n\n          <animate\n            attributeName="cy"\n            from="' + yBottom + '%"\n            to="' + yTop + '%"\n            dur="' + inhaleDuration + 's"\n            begin="inhale.begin"\n          />\n\n          <!-- InhaleHold -->\n          <animate\n            attributeName="cx"\n            from="' + inhaleHoldStartX + '%"\n            to="' + inhaleHoldEndX + '%"\n            dur="' + inhaleHoldDuration + 's"\n            id="inhaleHold"\n            begin="inhale.end"\n          />\n          <animate\n            attributeName="cy"\n            from="' + yTop + '%"\n            to="' + yTop + '%"\n            dur="' + inhaleHoldDuration + 's"\n            begin="inhaleHold.begin"\n          />\n\n          <!-- Exhale -->\n          <animate\n            attributeName="cx"\n            from="' + exhaleStartX + '%"\n            to="' + exhaleEndX + '%"\n            dur="' + exhaleDuration + 's"\n            id="exhale"\n            begin="inhaleHold.end"\n          />\n          <animate\n            attributeName="cy"\n            from="' + yTop + '%"\n            to="' + yBottom + '%"\n            dur="' + exhaleDuration + 's"\n            begin="exhale.begin"\n          />\n\n          <!-- exhaleHold -->\n          <animate\n            attributeName="cx"\n            from="' + exhaleHoldStartX + '%"\n            to="' + exhaleHoldEndX + '%"\n            dur="' + exhaleHoldDuration + 's"\n            id="exhaleHold"\n            begin="exhale.end"\n          />\n          <animate\n            attributeName="cy"\n            from="' + yBottom + '%"\n            to="' + yBottom + '%"\n            dur="' + exhaleHoldDuration + 's"\n            begin="exhaleHold.begin"\n          />\n        </circle>\n\n      </svg>\n  ';
    return React.createElement('div', null, React.createElement('h2', null, 'Breath Pacer'), React.createElement('form', { onSubmit: this.settingsChanged }, React.createElement('label', null, 'Inhale: ', React.createElement('input', { type: 'number', step: 'any', defaultValue: this.state.inhaleDuration, ref: 'inhaleDuration' }), ' '), React.createElement('br', null), React.createElement('label', null, 'Inhale Pause: ', React.createElement('input', { type: 'number', step: 'any', defaultValue: this.state.inhaleHoldDuration, ref: 'inhaleHoldDuration' }), ' '), React.createElement('br', null), React.createElement('label', null, 'Exhale: ', React.createElement('input', { type: 'number', step: 'any', defaultValue: this.state.exhaleDuration, ref: 'exhaleDuration' }), ' '), React.createElement('br', null), React.createElement('label', null, 'Exhale Pause: ', React.createElement('input', { type: 'number', step: 'any', defaultValue: this.state.exhaleHoldDuration, ref: 'exhaleHoldDuration' }), ' '), React.createElement('input', { type: 'submit' })), React.createElement('div', { ref: 'pacer', dangerouslySetInnerHTML: { __html: breathPacer } }));
  }
});