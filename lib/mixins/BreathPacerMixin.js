'use strict';

var React = require('react');
module.exports = {

  onInhale: function onInhale() {
    if (this.props.onInhale) {
      this.props.onInhale();
    }
    this._doInhale();
  },
  onInhaleHold: function onInhaleHold() {
    if (this.props.onInhaleHold) {
      this.props.onInhaleHold();
    }
    this._doInhaleHold();
  },
  onExhale: function onExhale() {
    if (this.props.onExhale) {
      this.props.onExhale();
    }
    this._doExhale();
  },
  onExhaleHold: function onExhaleHold() {
    if (this.props.onExhaleHold) {
      this.props.onExhaleHold();
    }
    this._doExhaleHold();
  },
  componentDidMount: function componentDidMount() {
    if (this.props.startOnMount) {
      this.onInhale();
    }
  },
  propTypes: {
    inhaleDuration: React.PropTypes.number,
    inhaleHoldDuration: React.PropTypes.number,
    exhaleDuration: React.PropTypes.number,
    exhaleHoldDuration: React.PropTypes.number
  },
  getDefaultProps: function getDefaultProps() {
    return {
      startOnMount: true,
      inhaleDuration: 4,
      inhaleHoldDuration: 1,
      exhaleDuration: 6,
      exhaleHoldDuration: 1
    };
  }

};
