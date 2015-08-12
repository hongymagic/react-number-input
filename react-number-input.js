//
// NumberInput formats numbers to comma-separated values after
// user loses focus of the input.
//
// Current dependencies are:
//   React, numeral.js
//
// Requires ES5 shim/sham in older browsers.
//

var React   = require('react');
var numeral = require('numeral');
var compose = require('compose-function');
var fnumber = '0,0[.][00]';
var Types   = React.PropTypes;

/**
 * Check if a given value is a valid number.
 *
 * @param   {any}
 * @returns {bool} True if given value is a valid number.
 */
function isNumber(value) {
	return typeof value === 'number' && isFinite(value) && !isNaN(value);
}

/**
 * Safe conversion to numeral object. Numeral crashes with the value is
 * object or function.
 *
 * @param   {any}
 * @returns {numeral}
 */
function toNumeral(value) {
	var type = typeof value;
	var n;

	if (type === 'object' || type === 'function' || type === 'boolean') {
		return null;
	}

	n = numeral(value);
	if (n.value() === 0 && (value !== 0 || value !== '0')) {
		return null;
	}

	return n;
}

/**
 * Convert given value to a number type. If conversion fails, returns NaN.
 *
 * @param   {any}
 * @returns {Number} NaN if conversion fails.
 */
function parseNumber(value) {
	var numeral = toNumeral(value);

	if (numeral == null) {
		return NaN;
	}

	return numeral.value();
}

/**
 * Apply number formatting to given number value. If given value cannot be
 * converted to a number, returns null.
 *
 * @param   {any}
 * @returns {string}
 */
function formatNumber(value, format) {
	var numeral = toNumeral(value);
	return numeral ? numeral.format(format || fnumber) : null;
}

/**
 * <NumberInput /> component
 *
 * @param   {Number} value
 * @returns {Component}
 */
var NumberInput = React.createClass({displayName: "NumberInput",
	statics: {
		isNumber: isNumber,
		formatNumber: formatNumber,
		parseNumber: parseNumber
	},

	propTypes: {
		value: Types.number.isRequired,
		format: Types.string
	},

	getDefaultProps: function () {
		// input[type=tel] allows separators in the input field, changing it
		// to input[type=number] will remove formatting
		return {
			onBlur: function () {},
			onFocus: function () {},
			onChange: function () {},
			type: 'tel',
			value: null,
			format: fnumber
		};
	},

	getInitialState: function () {
		var value = parseNumber(this.props.value);

		// focused: keep track of the input's focus state
		// numeral: keep track of the input's current value (numeral object)
		return {
			focused: false,
			value: isNumber(value) ? value : ''
		};
	},

	componentWillReceiveProps: function (props) {
		var value;

		// Prevent changing the value via external entry when editing.
		if (!this.state.focused && 'value' in props) {
			value = parseNumber(props.value);
			this.setState({ value: isNumber(value) ? value : '' });
		}
	},

	componentDidMount: function () {
		// focused: check if component is focused after mounting and set state
		this.setState({
			focused: global.document.activeElement === this.refs.input.getDOMNode()
		});
	},

	onChange: function (event) {
		this.setState({ value: event.target.value });
		event.persist();
		return event;
	},

	onBlur: function (event) {
		var numeral = toNumeral(event.target.value);
		this.setState({ focused: false, value: numeral ? numeral.format(this.props.format) : '' });
		event.persist();
		return event;
	},

	onFocus: function (event) {
		var numeral = toNumeral(event.target.value);
		this.setState({ focused: true, value: numeral ? numeral.value() : '' });
		event.persist();
		return event;
	},

	valueAsFormatted: function () {
		var value = this.state.value;
		var numeral = toNumeral(value);

		return numeral ? numeral.format(this.props.format) : '';
	},

	render: function () {
		var props = this.props;

		var onChange = compose(props.onChange, this.onChange);
		var onFocus = compose(props.onFocus, this.onFocus);
		var onBlur = compose(props.onBlur, this.onBlur);
		var value = this.state.focused ? this.state.value : this.valueAsFormatted();

		return (
			React.createElement("input", React.__spread({
				ref: "input"}, 
				props, 
				{onChange: onChange, 
				onBlur: onBlur, 
				onFocus: onFocus, 
				value: value})
			)
		);
	}
});

module.exports = NumberInput;
