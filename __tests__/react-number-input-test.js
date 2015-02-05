jest.dontMock('../react-number-input');

describe('react-number-input', function () {
	var React = require('react/addons');
	var NumberInput = require('../react-number-input');
	var TestUtils = React.addons.TestUtils;
	var Simulate = TestUtils.Simulate;

	describe('input#value', function () {
		var value = 900000;
		var component;

		beforeEach(function () {
			component = TestUtils.renderIntoDocument(
				<NumberInput value={value} />
			);
		});

		it('should display formatted value when rendered', function () {
			// Verify that number has been formatted
			expect(component.getDOMNode().value).toEqual('900,000');
		});

		it('should display un-formatted number when editing', function () {
			// Change the number
			Simulate.change(component.getDOMNode(), {
				target: {
					value: '1000000'
				}
			});

			// Verify that number has been formatted
			expect(component.getDOMNode().value).toEqual('1000000');
		});

		it('should display formatted number when editing is complete', function () {
			// Change the number
			Simulate.change(component.getDOMNode(), {
				target: {
					value: '1000000'
				}
			});
			Simulate.blur(component.getDOMNode());

			// Verify that number has been formatted
			expect(component.getDOMNode().value).toEqual('1,000,000');
		});
	});

	describe('onChange', function () {
		var value = 900000;
		var handlers, component;

		beforeEach(function () {
			handlers = {
				onChange: function (event) {
					console.log(event);
				}
			};

			spyOn(handlers, 'onChange');
			component = TestUtils.renderIntoDocument(
				<NumberInput value={value} onChange={handlers.onChange} />
			);

			Simulate.change(component.getDOMNode(), {
				target: {
					value: '1000000'
				}
			});
		});

		it('should be run when input is changed', function () {
			expect(handlers.onChange).toHaveBeenCalled();
		});

		it('should be passed unformatted value', function () {
			expect(handlers.onChange.mostRecentCall.args[0].target.value).toEqual('1000000');
		});
	});
});