//
// NumberInput formats numbers to comma-separated values after
// user loses focus of the input.
//
// Current dependencies are:
//   React, numeral.js
//
// Requires ES5 shim/sham in older browsers.
//

var React   = require('react/addons');
var numeral = require('numeral');
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

	// numeral.js converts empty strings/etc into 0 for no reason, so if given
	// value was not 0 or '0' return null instead.
	if (n.value() === 0 && (value !== 0 && value !== '0')) {
		return null;
	}

	// numeral.js can sometimes translate values into NaN, in which case we
	// want to return null. e.g., '4.5.2'
	if (isNaN(n.value())) {
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
	var n = toNumeral(value);

	if (n == null) {
		return NaN;
	}

	return n.value();
}

/**
 * Apply number formatting to given number value. If given value cannot be
 * converted to a number, returns null.
 *
 * @param   {any}
 * @returns {string}
 */
function formatNumber(value, format) {
	var n = toNumeral(value);
	return n ? n.format(format || fnumber) : null;
}

/**
 * <NumberInput /> component
 *
 * @param   {Number} value
 * @returns {Component}
 */
var NumberInput = React.createClass({displayName: "NumberInput",
	mixins: [React.addons.PureRenderMixin],

	statics: {
		isNumber: isNumber,
		formatNumber: formatNumber,
		parseNumber: parseNumber
	},

	propTypes: {
		value: Types.number.isRequired,
		min: Types.number,
		max: Types.number,
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
		event.persist();
		this.setState(
			{ value: event.target.value },
			function () { this.props.onChange(event); }.bind(this)
		);
		return event;
	},

	onBlur: function (event) {
		event.persist();
		var n = toNumeral(event.target.value);

		// If given value is lower than minimum, set the value to minimum
		if (n && 'min' in this.props && n.value() < this.props.min) {
			n = toNumeral(this.props.min);
		}

		// If given value is higher than maximum, set the value to maximum
		if (n && 'max' in this.props && n.value() > this.props.max) {
			n = toNumeral(this.props.max);
		}

		// Set the event target value to corrected value
		event.target.value = n ? n.value() : ''

		this.setState(
			{ focused: false, value: n ? n.format(this.props.format) : '' },
			function () { this.props.onBlur(event); }.bind(this)
		);
		return event;
	},

	onFocus: function (event) {
		event.persist();
		var n = toNumeral(event.target.value);
		this.setState(
			{ focused: true, value: n ? n.value() : '' },
			function () { this.props.onFocus(event); }.bind(this)
		);
		return event;
	},

	valueAsFormatted: function () {
		var value = this.state.value;
		var n = toNumeral(value);

		return n ? n.format(this.props.format) : '';
	},

	render: function () {
		var props = this.props;
		var value = this.state.focused ? this.state.value : this.valueAsFormatted();

		return (
			React.createElement("input", React.__spread({
				ref: "input"}, 
				props, 
				{onChange: this.onChange, 
				onBlur: this.onBlur, 
				onFocus: this.onFocus, 
				value: value})
			)
		);
	}
});

module.exports = NumberInput;
