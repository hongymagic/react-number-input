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
			expect(component.getDOMNode().value).toEqual('900,000');
		});

		it('should display un-formatted number when editing', function () {
			// Change the number
			Simulate.focus(component.getDOMNode());
			Simulate.change(component.getDOMNode(), event);

			// Verify that number has been formatted
			expect(component.getDOMNode().value).toEqual('1000000');
		});

		xit('should display un-formatted zeroes when all digits are zeroes', function () {
			event.target.value = '000000';

			// Change the number
			Simulate.change(component.getDOMNode(), event);

			// Verify that number has been formatted
			expect(component.getDOMNode().value).toEqual('000000');
		});

		it('should display un-formatted netgative number when editing', function () {
			event.target.value = '-900000';

			// Change the number
			Simulate.focus(component.getDOMNode());
			Simulate.change(component.getDOMNode(), event);

			// Verify that number has been formatted
			expect(component.getDOMNode().value).toEqual('-900000');
		});

		it('should display formatted number when editing is complete', function () {
			// Change the number
			Simulate.change(component.getDOMNode(), event);
			Simulate.blur(component.getDOMNode());

			// Verify that number has been formatted
			expect(component.getDOMNode().value).toEqual('1,000,000');
		});

		it('should display formatted negative number when editing is complete', function () {
			event.target.value = '-900000';

			// Change the number
			Simulate.change(component.getDOMNode(), event);
			Simulate.blur(component.getDOMNode());

			// Verify that number has been formatted
			expect(component.getDOMNode().value).toEqual('-900,000');
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
			Simulate.change(component.getDOMNode(), event);
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
			Simulate.change(component.getDOMNode(), event);

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

			var node = component.getDOMNode();
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

			var node = component.getDOMNode();
			Simulate.focus(node, event);
		});

		it('should be run when input is blurred', function () {
			expect(handlers.onFocus).toHaveBeenCalled();
		});

		it('should be passed unformatted value', function () {
			expect(handlers.onFocus.mostRecentCall.args[0].target).toEqual(event.target);
		});
	});

	describe('NumberInput.isNumber', function () {
		var wrong = [
			undefined,
			null,
			'Hello World',
			{ key: 0 },
			function noop() {},
			true,
			false
		];

		wrong.forEach(function (arg) {
			it('should return false when fed incorrect argument: [' + typeof arg + ', ' + arg + ']', function () {
				expect(NumberInput.isNumber(arg)).toBe(false);
			});
		});
	});

	describe('NumberInput.formatNumber', function () {
		var wrong = [
			undefined,
			null,
			'Hello World',
			{ key: 0 },
			function noop() {},
			true,
			false
		];

		wrong.forEach(function (arg) {
			it('should return 0 when fed incorrect argument: [' + typeof arg + ', ' + arg + ']', function () {
				expect(NumberInput.formatNumber(arg)).toBe(null);
			});
		});

		it('should add comma separators correctly when input is correct', function () {
			expect(NumberInput.formatNumber(1000000)).toBe('1,000,000');
			expect(NumberInput.formatNumber(1000000.9)).toBe('1,000,000.9');
			expect(NumberInput.formatNumber(1000000.94)).toBe('1,000,000.94');
			expect(NumberInput.formatNumber(-1000000.94)).toBe('-1,000,000.94');

			expect(NumberInput.formatNumber('1000000')).toBe('1,000,000');
			expect(NumberInput.formatNumber('1000000.9')).toBe('1,000,000.9');
			expect(NumberInput.formatNumber('1000000.94')).toBe('1,000,000.94');
			expect(NumberInput.formatNumber('-1000000.94')).toBe('-1,000,000.94');

			expect(NumberInput.formatNumber('1,000,000')).toBe('1,000,000');
			expect(NumberInput.formatNumber('1,000,000.9')).toBe('1,000,000.9');
			expect(NumberInput.formatNumber('1,000,000.94')).toBe('1,000,000.94');
			expect(NumberInput.formatNumber('-1,000,000.94')).toBe('-1,000,000.94');
		});
	});

	describe('NumberInput.parseNumber', function () {
		var wrong = [
			undefined,
			null,
			'Hello World',
			{ key: 0 },
			function noop() {},
			true,
			false
		];

		wrong.forEach(function (arg) {
			it('should return 0 when fed incorrect argument: [' + typeof arg + ', ' + arg + ']', function () {
				expect(isNaN(NumberInput.parseNumber(arg))).toBe(true);
			});
		});


		it('should convert to number when input is correct', function () {
			expect(NumberInput.parseNumber(1000000)).toBe(1000000);
			expect(NumberInput.parseNumber(1000000.9)).toBe(1000000.9);
			expect(NumberInput.parseNumber(1000000.94)).toBe(1000000.94);
			expect(NumberInput.parseNumber(-1000000.94)).toBe(-1000000.94);

			expect(NumberInput.parseNumber('1000000')).toBe(1000000);
			expect(NumberInput.parseNumber('1000000.9')).toBe(1000000.9);
			expect(NumberInput.parseNumber('1000000.94')).toBe(1000000.94);
			expect(NumberInput.parseNumber('-1000000.94')).toBe(-1000000.94);

			expect(NumberInput.parseNumber('1,000,000')).toBe(1000000);
			expect(NumberInput.parseNumber('1,000,000.9')).toBe(1000000.9);
			expect(NumberInput.parseNumber('1,000,000.94')).toBe(1000000.94);
			expect(NumberInput.parseNumber('-1,000,000.94')).toBe(-1000000.94);
		});
	});
});