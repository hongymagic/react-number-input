jest.dontMock('../react-number-input.jsx');

describe('react-number-input', function () {
	var React       = require('react/addons');
	var TestUtils   = React.addons.TestUtils;
	var Simulate    = TestUtils.Simulate;
	var NumberInput = require('../react-number-input.jsx');

	describe('input#value', function () {
		var value = 900000;
		var component, event;

		beforeEach(function () {
			component = TestUtils.renderIntoDocument(
				<NumberInput
					value={value}
					onChange={function () {}}
				/>
			);

			event = {
				target: {
					value: '1000000'
				}
			};
		});

		afterEach(function () {
			component = null;
			event = null;
		});

		it('should set focused state to false on load', function () {
			expect(component.state.focused).toBe(false);
		});

		it('should display formatted value when rendered', function () {
			// Verify that number has been formatted
			expect(React.findDOMNode(component).value).toEqual('900,000');
		});

		it('should display un-formatted number when editing', function () {
			// Change the number
			Simulate.focus(React.findDOMNode(component));
			Simulate.change(React.findDOMNode(component), event);

			// Verify that number has been formatted
			expect(React.findDOMNode(component).value).toEqual('1000000');
		});

		it('should display un-formatted netgative number when editing', function () {
			event.target.value = '-900000';

			// Change the number
			Simulate.focus(React.findDOMNode(component));
			Simulate.change(React.findDOMNode(component), event);

			// Verify that number has been formatted
			expect(React.findDOMNode(component).value).toEqual('-900000');
		});

		it('should display formatted number when editing is complete', function () {
			// Change the number
			Simulate.change(React.findDOMNode(component), event);
			Simulate.blur(React.findDOMNode(component));

			// Verify that number has been formatted
			expect(React.findDOMNode(component).value).toEqual('1,000,000');
		});

		it('should display formatted negative number when editing is complete', function () {
			event.target.value = '-900000';

			// Change the number
			Simulate.change(React.findDOMNode(component), event);
			Simulate.blur(React.findDOMNode(component));

			// Verify that number has been formatted
			expect(React.findDOMNode(component).value).toEqual('-900,000');
		});
	});

	describe('onChange', function () {
		var value = 900000;
		var handlers, component, event;

		beforeEach(function () {
			handlers = {
				onChange: function (event) {
					console.log(event);
				}
			};

			spyOn(handlers, 'onChange');
			component = TestUtils.renderIntoDocument(
				<NumberInput
					id='test'
					value={value}
					onChange={handlers.onChange}
				/>
			);

			event = {
				target: {
					value: '1000000',
					id: 'test'
				}
			};
			Simulate.change(React.findDOMNode(component), event);
		});

		it('should be run when input is changed', function () {
			expect(handlers.onChange).toHaveBeenCalled();
		});

		it('should be passed the original event', function () {
			expect(handlers.onChange.mostRecentCall.args[0].target).toEqual(event.target);
		});

		it('should be passed 0 when input contains all zeroes', function () {
			event = {
				target: {
					value: '000000'
				}
			};
			Simulate.change(React.findDOMNode(component), event);

			expect(handlers.onChange.mostRecentCall.args[0].target).toEqual(event.target);
		});
	});

	describe('onBlur', function () {
		var value = 900000;
		var handlers, event, component;

		beforeEach(function () {
			handlers = {
				onBlur: function (event) {
					console.log(event);
				}
			};

			spyOn(handlers, 'onBlur');
			component = TestUtils.renderIntoDocument(
				<NumberInput
					id='test'
					value={value}
					onBlur={handlers.onBlur}
					onChange={function () {}}
				/>
			);

			event = {
				target: {
					value: '1000000',
					id: 'test'
				}
			};

			var node = React.findDOMNode(component);
			Simulate.blur(node, event);
		});

		it('should be run when input is blurred', function () {
			expect(handlers.onBlur).toHaveBeenCalled();
		});

		it('should be passed unformatted value', function () {
			expect(handlers.onBlur.mostRecentCall.args[0].target).toEqual(event.target);
		});
	});

	describe('onFocus', function () {
		var value = 900000;
		var handlers, event, component;

		beforeEach(function () {
			handlers = {
				onFocus: function (event) {
					console.log(event);
				}
			};

			spyOn(handlers, 'onFocus');
			component = TestUtils.renderIntoDocument(
				<NumberInput
					id='test'
					value={value}
					onFocus={handlers.onFocus}
					onChange={function () {}}
				/>
			);

			event = {
				target: {
					value: '1000000',
					id: 'test'
				}
			};

			var node = React.findDOMNode(component);
			Simulate.focus(node, event);
		});

		it('should be run when input is blurred', function () {
			expect(handlers.onFocus).toHaveBeenCalled();
		});

		it('should be passed unformatted value', function () {
			expect(handlers.onFocus.mostRecentCall.args[0].target).toEqual(event.target);
		});
	});

	describe('min/max behaviour', function () {
		beforeEach(function () {
			component = TestUtils.renderIntoDocument(
				<NumberInput
					min={0}
					max={10}
					type='number'
					value={5}
				/>
			);
		});

		it('should reset value to minimum value if user-entered value is lower', function () {
			Simulate.blur(React.findDOMNode(component), {
				target: {
					value: '-1'
				}
			});

			expect(React.findDOMNode(component).value).toBe('0');
		});

		it('should reset value to maximum value if user-entered value is greater', function () {
			Simulate.blur(React.findDOMNode(component), {
				target: {
					value: '11'
				}
			});

			expect(React.findDOMNode(component).value).toBe('10');
		});
	});
});