var React = require('react/addons');
module.exports = {

  onInhale(){
    if(this.props.onInhale){
      this.props.onInhale()
    }
    this._doInhale()
  },
  onInhaleHold(){
    if(this.props.onInhaleHold){
      this.props.onInhaleHold()
    }
    this._doInhaleHold()
  },
  onExhale(){
    if(this.props.onExhale){
      this.props.onExhale()
    }
    this._doExhale()
  },
  onExhaleHold(){
    if(this.props.onExhaleHold){
      this.props.onExhaleHold()
    }
    this._doExhaleHold()
  },
  componentDidMount(){
    if(this.props.startOnMount){
      this.onInhale();
    }
  },
  propTypes: {
    inhaleDuration: React.PropTypes.number,
    inhaleHoldDuration: React.PropTypes.number,
    exhaleDuration: React.PropTypes.number,
    exhaleHoldDuration: React.PropTypes.number,
  },
  getDefaultProps() {
    return {
      startOnMount:true,
      inhaleDuration: 4,
      inhaleHoldDuration: 1,
      exhaleDuration: 6,
      exhaleHoldDuration: 1,
    };
  },

};