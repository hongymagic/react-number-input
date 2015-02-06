//
// NumberInput formats numbers to comma-separated values after
// user loses focus of the input.
//
// Current dependencies are:
//   React and Lodash
//
// Requires ES5 shim/sham in older browsers.
//
// Current known, potential problems:
//   * No support for negative numbers
//   * Limited/No support for decimal numbers
//   * Behaviour unknown when other events are attached to NumberInput
//

var React   = require('react');
var _       = require('lodash');
var numeral = require('numeral');
var Types   = React.PropTypes;

function format(value) {
	return numeral(value).format('0,0[.][00]');
}

var NumberInput = React.createClass({
	propTypes: {
		value: Types.number,
		onChange: Types.func,
		onBlur: Types.func,
		onFocus: Types.func
	},

	getDefaultProps: function () {
		return {
			onBlur: function () {},
			onFocus: function () {},
			onChange: function () {}
		};
	},

	getInitialState: function () {
		var value = this.props.value;

		return {
			focused: false,
			value: value ? format(value) : value
		};
	},

	componentWillReceiveProps: function (props) {
		var value = props.value;

		if (!this.state.focused) {
			value = value ? format(value) : value;
		}

		this.setState({
			value: value
		});
	},

	_onChange: function (event) {
		var copy = _.cloneDeep(event);

		this.setState(
			{ value: event.target.value },
			function () { this.props.onChange(copy); }
		);
	},

	_onBlur: function (event) {
		var formatted = format(event.target.value);
		var copy = _.cloneDeep(event);

		this.setState(
			{
				value: formatted,
				focused: false
			},
			function () { this.props.onBlur(copy); }
		);
	},

	_onFocus: function (event) {
		var copy = _.cloneDeep(event);

		// When user focuses the input, remove all number formatting.
		// TODO: support negative integers, and decimal points.
		this.setState(
			{
				value: event.target.value.replace(/[^0-9]/g, ''),
				focused: true
			},
			function () { this.props.onFocus(copy); }
		);
	},

	render: function () {
		// Handle these events internally and trigger them after they have
		// been processed internally.
		var props = _.omit(this.props, ['onChange', 'onBlur', 'onFocus']);

		props.onChange = this._onChange;
		props.onBlur = this._onBlur;
		props.onFocus = this._onFocus;
		props.value = this.state.value;

		return (
			// type="tel" used to allow number input keyboard on iOS devices.
			<input
				type="tel"
				{...props}
			/>
		);
	}
});

module.exports = NumberInput;