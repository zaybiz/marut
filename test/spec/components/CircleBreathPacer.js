'use strict'

const React = require('react/addons')
const TestUtils = require('react/lib/ReactTestUtils')
const CircleBreathPacer = require('components/CircleBreathPacer.js')

describe('CircleBreathPacer', () => {
	let clock;
	const TIMER_BUFFER = 100;
	beforeEach(() => {
		clock = sinon.useFakeTimers();
    element = TestUtils.renderIntoDocument(<CircleBreathPacer />)
  })

  afterEach(() => {
  	clock.restore();
  })

	let element
	let defaultProps = CircleBreathPacer.getDefaultProps()
  
  it('should have correct default props set', () => {
  	let requiredPropNames = ['inhaleDuration', 'inhaleHoldDuration', 'exhaleDuration', 'exhaleHoldDuration', 'startOnMount', 'startDiameter', 'endDiameter']
	  let keys = [], i = 0; for (keys[i++] in defaultProps) {}
	  expect(keys).to.have.members(requiredPropNames)
  })

  describe('when not passed props', () => {
  	beforeEach(() => {
	    element = TestUtils.renderIntoDocument(<CircleBreathPacer />)
	  })

 	  it('should initialize with correct dimensions', () => {
		  let outerCircle = TestUtils.findRenderedDOMComponentWithClass(element,'circle-breath-pacer-outer')
		  expect(outerCircle.getDOMNode().style.width).to.eql(defaultProps.endDiameter +'px')
		  
		  let innerCircle = TestUtils.findRenderedDOMComponentWithClass(element,'circle-breath-pacer-inner')
		  expect(innerCircle.getDOMNode().style.width).to.eql(defaultProps.startDiameter +'px')
	  })
  })

  describe('when passed dimensions', () => {
  	let passedStartDiameter = defaultProps.startDiameter +5
  	let passedEndDiameter = defaultProps.endDiameter + 5
	 
	  beforeEach(() => {
	    element = TestUtils.renderIntoDocument(<CircleBreathPacer endDiameter={passedEndDiameter} startDiameter={passedStartDiameter} />)
	  })

	  it('should overide default dimensions', () => {
	  	let outerCircle = TestUtils.findRenderedDOMComponentWithClass(element,'circle-breath-pacer-outer')
		  expect(outerCircle.getDOMNode().style.width).to.eql(passedEndDiameter +'px')
		  
		  let innerCircle = TestUtils.findRenderedDOMComponentWithClass(element,'circle-breath-pacer-inner')
		  expect(innerCircle.getDOMNode().style.width).to.eql(passedStartDiameter +'px')

	  })
  })

  describe('when passed breath cycle callbacks', () => {
  	let passedOnInhaleSpy = sinon.stub();
  	let passedOnInhaleHoldSpy = sinon.stub();
  	let passedOnExhaleSpy = sinon.stub();
  	let passedOnExhaleHoldSpy = sinon.stub();
	 
	  beforeEach(() => {
	    element = TestUtils.renderIntoDocument(<CircleBreathPacer onInhale={passedOnInhaleSpy} onInhaleHold={passedOnInhaleHoldSpy} onExhale={passedOnExhaleSpy} onExhaleHold={passedOnExhaleHoldSpy}/>)
	  })
  	
	  it('should call all passed callbacks', (done) => {
	  	sinon.assert.calledWith(passedOnInhaleSpy);
  		clock.tick(defaultProps.inhaleDuration * 1000 + TIMER_BUFFER )
	  	sinon.assert.calledOnce(passedOnInhaleHoldSpy);
  		clock.tick(defaultProps.inhaleHoldDuration * 1000 + TIMER_BUFFER )
	  	sinon.assert.calledWith(passedOnExhaleSpy);
  		clock.tick(defaultProps.exhaleDuration * 1000 + TIMER_BUFFER )
	  	sinon.assert.calledOnce(passedOnExhaleHoldSpy);
	  	done()
	  })
  })

})
