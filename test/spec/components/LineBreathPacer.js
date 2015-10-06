'use strict';

var React = require('react/addons');
var TestUtils = require('react/lib/ReactTestUtils');
var LineBreathPacer = require('components/LineBreathPacer.js');
describe('LineBreathPacer', () => {
  var element;
  beforeEach(() => {
    element = TestUtils.renderIntoDocument(<LineBreathPacer />);
  });

  it('renders', () => {
    expect(element).to.be.defined;
  });

});
