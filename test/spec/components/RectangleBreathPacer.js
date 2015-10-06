'use strict'

const React = require('react/addons')
const TestUtils = require('react/lib/ReactTestUtils')
const RectangleBreathPacer = require('components/RectangleBreathPacer.js')

describe('RectangleBreathPacer', () => {
  let clock;
  const TIMER_BUFFER = 1000;
  beforeEach(() => {
    clock = sinon.useFakeTimers();
    element = TestUtils.renderIntoDocument(<RectangleBreathPacer />)
  })

  afterEach(() => {
    clock.restore();
  })

  let element
  let defaultProps = RectangleBreathPacer.getDefaultProps()
  
  it('should have correct default props set', () => {
    let requiredPropNames = ['inhaleDuration', 'inhaleHoldDuration', 'exhaleDuration', 'exhaleHoldDuration', 'startOnMount', 'width', 'height']
    let keys = [], i = 0; for (keys[i++] in defaultProps) {}
    expect(keys).to.have.members(requiredPropNames)
  })

  describe('when not passed props', () => {
    beforeEach(() => {
      element = TestUtils.renderIntoDocument(<RectangleBreathPacer />)
    })

    it('should initialize with correct dimensions', () => {
      expect(element.getDOMNode().style.width).to.eql(defaultProps.width +'px')
      expect(element.getDOMNode().style.height).to.eql(defaultProps.height +'px')
    })
  })

  describe('when passed dimensions', () => {
    let passedWidth = defaultProps.width + 5
    let passedHeight = defaultProps.height + 5
   
    beforeEach(() => {
      element = TestUtils.renderIntoDocument(<RectangleBreathPacer width={passedWidth} height={passedHeight} />)
    })

    it('should overide default dimensions', () => {
      expect(element.getDOMNode().style.width).to.eql(passedWidth + 'px')
      expect(element.getDOMNode().style.height).to.eql(passedHeight +'px')

    })
  })

  describe('when passed breath cycle callbacks', () => {
    // let passedOnInhaleSpy = function(){
    //   console.log('spec log')
    // };
    let passedOnInhaleSpy = sinon.stub();
    let passedOnInhaleHoldSpy = sinon.stub();
    let passedOnExhaleSpy = sinon.stub();
    let passedOnExhaleHoldSpy = sinon.stub();
   
    beforeEach(() => {
      element = TestUtils.renderIntoDocument(<RectangleBreathPacer onInhale={passedOnInhaleSpy} onInhaleHold={passedOnInhaleHoldSpy} onExhale={passedOnExhaleSpy} onExhaleHold={passedOnExhaleHoldSpy}/>)
    })
    
    it('should call all passed callbacks', (done) => {
      sinon.assert.calledOnce(passedOnInhaleSpy);
      clock.tick((defaultProps.inhaleDuration * 1000) + TIMER_BUFFER )
      console.log(clock)
      sinon.assert.calledOnce(passedOnInhaleHoldSpy);
      // clock.tick(defaultProps.inhaleHoldDuration * 1000 + TIMER_BUFFER )
      // sinon.assert.calledWith(passedOnExhaleSpy);
      // clock.tick(defaultProps.exhaleDuration * 1000 + TIMER_BUFFER )
      // sinon.assert.calledOnce(passedOnExhaleHoldSpy);
      done()
    })
  })

})
