jest.dontMock('../react-number-input.jsx');

describe('react-number-input static functions', function () {
	var React       = require('react/addons');
	var TestUtils   = React.addons.TestUtils;
	var Simulate    = TestUtils.Simulate;
	var NumberInput = require('../react-number-input.jsx');

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
			false,
			'4.5.2'
		];

		wrong.forEach(function (arg) {
			it('should return 0 when fed incorrect argument: [' + typeof arg + ', ' + arg + ']', function () {
				expect(NumberInput.formatNumber(arg)).toBe(null);
			});
		});

		it('should add comma separators correctly when input is correct', function () {
			expect(NumberInput.formatNumber(0)).toBe('0');
			expect(NumberInput.formatNumber('0')).toBe('0');

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
			false,
			'4.5.2'
		];

		wrong.forEach(function (arg) {
			it('should return 0 when fed incorrect argument: [' + typeof arg + ', ' + arg + ']', function () {
				expect(isNaN(NumberInput.parseNumber(arg))).toBe(true);
			});
		});

		it('should convert to number when input is correct', function () {
			expect(NumberInput.parseNumber(0)).toBe(0);
			expect(NumberInput.parseNumber('0')).toBe(0);

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