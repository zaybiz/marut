var React = require('react/addons');

module.exports = React.createClass({
  getInitialState(){
    return {
      inhaleDuration : 4,
      inhaleHoldDuration : 1,
      exhaleDuration : 6,
      exhaleHoldDuration : 1,
    }
    // return false;
  },
  settingsChanged(e){
    // console.log(this.refs.inhaleDuration.getDOMNode().value)
    e.preventDefault();
    this.setState({
      inhaleDuration : parseInt(this.refs.inhaleDuration.getDOMNode().value),
      inhaleHoldDuration : parseInt(this.refs.inhaleHoldDuration.getDOMNode().value),
      exhaleDuration : parseInt(this.refs.exhaleDuration.getDOMNode().value),
      exhaleHoldDuration : parseInt(this.refs.exhaleHoldDuration.getDOMNode().value),
    })
  },
  componentDidMount(){
    var pacerContainer = this.refs.pacer.getDOMNode();
    var inhaleAnimation = pacerContainer.querySelector('#inhale');
    var exhaleAnimation = pacerContainer.querySelector('#exhale');
    inhaleAnimation.addEventListener('beginEvent',function(){
    });
    inhaleAnimation.addEventListener('endEvent',function(){
    });
    // console.log(inhaleAnimation,exhaleAnimation)
  },
  render() {
    var inhaleDuration = this.props.inhaleDuration || 0.001;
    var inhaleHoldDuration = this.props.inhaleHoldDuration || 0.001;
    var exhaleDuration = this.props.exhaleDuration || 0.001;
    var exhaleHoldDuration = this.props.exhaleHoldDuration ||0.001;

    var totalDuration = inhaleDuration + inhaleHoldDuration + exhaleDuration + exhaleHoldDuration;
    var inhaleDurationPercent = (inhaleDuration/totalDuration)*100;
    var inhaleHoldDurationPercent = (inhaleHoldDuration/totalDuration)*100;
    var exhaleDurationPercent = (exhaleDuration/totalDuration)*100;
    var exhaleHoldDurationPercent = (exhaleHoldDuration/totalDuration)*100;

    var inhaleStartX = 0;
    var inhaleEndX = inhaleDurationPercent;
    var inhaleHoldStartX = inhaleEndX;
    var inhaleHoldEndX = inhaleEndX + inhaleHoldDurationPercent;
    var exhaleStartX = inhaleHoldEndX;
    var exhaleEndX = inhaleHoldEndX + exhaleDurationPercent;
    var exhaleHoldStartX = exhaleEndX;
    var exhaleHoldEndX =  exhaleEndX + exhaleHoldDurationPercent;

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
    var breathPacer = `
      <svg width="100%" height="200"
        style="padding:30px"
       xmlns="http://www.w3.org/2000/svg" version="1.1"
       xmlns:xlink="http://www.w3.org/1999/xlink">
        <!-- InhaleLine -->
        <line
          x1="${inhaleStartX}%"
          y1="${yBottom}%"
          x2="${inhaleEndX}%"
          y2="${yTop}%"
          stroke="black"
          stroke-width="5"
        />

        <!-- InhaleHoldLine -->
        <line
          x1="${inhaleHoldStartX}%"
          y1="${yTop}%"
          x2="${inhaleHoldEndX}%"
          y2="${yTop}%"
          stroke="black"
          stroke-width="5"
        />

        <!-- exhaleLine -->
        <line
          x1="${exhaleStartX}%"
          y1="${yTop}%"
          x2="${exhaleEndX}%"
          y2="${yBottom}%"
          stroke="black"
          stroke-width="5"
        />

        <!-- exhaleHoldLine -->
        <line
          x1="${exhaleHoldStartX}%"
          y1="${yBottom}%"
          x2="${exhaleHoldEndX}%"
          y2="${yBottom}%"
          stroke="black"
          stroke-width="5"
        />

        <circle id="orange-circle" r="16" cx="10" cy="10" fill="orange" >
          <!-- inhale -->
          <animate
            attributeName="cx"
            from="${inhaleStartX}%"
            to="${inhaleEndX}%"
            dur="${inhaleDuration}s"
            id="inhale"
            begin="0s;exhaleHold.end"
          />

          <animate
            attributeName="cy"
            from="${yBottom}%"
            to="${yTop}%"
            dur="${inhaleDuration}s"
            begin="inhale.begin"
          />

          <!-- InhaleHold -->
          <animate
            attributeName="cx"
            from="${inhaleHoldStartX}%"
            to="${inhaleHoldEndX}%"
            dur="${inhaleHoldDuration}s"
            id="inhaleHold"
            begin="inhale.end"
          />
          <animate
            attributeName="cy"
            from="${yTop}%"
            to="${yTop}%"
            dur="${inhaleHoldDuration}s"
            begin="inhaleHold.begin"
          />

          <!-- Exhale -->
          <animate
            attributeName="cx"
            from="${exhaleStartX}%"
            to="${exhaleEndX}%"
            dur="${exhaleDuration}s"
            id="exhale"
            begin="inhaleHold.end"
          />
          <animate
            attributeName="cy"
            from="${yTop}%"
            to="${yBottom}%"
            dur="${exhaleDuration}s"
            begin="exhale.begin"
          />

          <!-- exhaleHold -->
          <animate
            attributeName="cx"
            from="${exhaleHoldStartX}%"
            to="${exhaleHoldEndX}%"
            dur="${exhaleHoldDuration}s"
            id="exhaleHold"
            begin="exhale.end"
          />
          <animate
            attributeName="cy"
            from="${yBottom}%"
            to="${yBottom}%"
            dur="${exhaleHoldDuration}s"
            begin="exhaleHold.begin"
          />
        </circle>

      </svg>
  `;
  //       <h2>Breath Pacer</h2>
  //       <form onSubmit={this.settingsChanged}>
  //         <label>Inhale: <input type="number" step="any" defaultValue={this.props.inhaleDuration} ref='inhaleDuration'/> </label>
  // <br/>
  //         <label>Inhale Pause: <input type="number" step="any" defaultValue={this.props.inhaleHoldDuration} ref='inhaleHoldDuration'/> </label>
  // <br/>
  //         <label>Exhale: <input type="number" step="any" defaultValue={this.props.exhaleDuration} ref='exhaleDuration'/> </label>
  //         <br/>
  //         <label>Exhale Pause: <input type="number" step="any" defaultValue={this.props.exhaleHoldDuration} ref='exhaleHoldDuration'/> </label>
  //         <input type="submit" />
  //       </form>
    return (
      <div>
        <div ref='pacer' dangerouslySetInnerHTML={{__html: breathPacer}} />
      </div>
    );
  }
});
