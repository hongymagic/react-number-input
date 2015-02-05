jest.dontMock('../react-number-input');

describe('react-number-input', function () {
	it('should display formatted number on initial render', function () {
		var React = require('react/addons');
		var NumberInput = require('../react-number-input');
		var TestUtils = React.addons.TestUtils;
		var value = 900000;

		// Render
		var input = TestUtils.renderIntoDocument(
			<NumberInput value={value} />
		);

		// Verify that number has been formatted
		expect(input.getDOMNode().value).toEqual('900,000');
	});

	it('should display unformatted number when typing', function () {
		var React = require('react/addons');
		var NumberInput = require('../react-number-input');
		var TestUtils = React.addons.TestUtils;
		var Simulate = TestUtils.Simulate;
		var value = 900000;

		// Render
		var input = TestUtils.renderIntoDocument(
			<NumberInput value={value} />
		);

		// Change the number
		Simulate.change(input.getDOMNode(), {
			target: {
				value: '1000000'
			}
		});

		// Verify that number has been formatted
		expect(input.getDOMNode().value).toEqual('1000000');
	});

	it('should display formatted number when changed', function () {
		var React = require('react/addons');
		var NumberInput = require('../react-number-input');
		var TestUtils = React.addons.TestUtils;
		var Simulate = TestUtils.Simulate;
		var value = 900000;

		// Render
		var input = TestUtils.renderIntoDocument(
			<NumberInput value={value} />
		);

		// Change the number
		Simulate.change(input.getDOMNode(), {
			target: {
				value: '1000000'
			}
		});
		Simulate.blur(input.getDOMNode());

		// Verify that number has been formatted
		expect(input.getDOMNode().value).toEqual('1,000,000');
	});
});