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
var numeral = require('numeral');
var Types   = React.PropTypes;

function format(value) {
	return numeral(value).format('0,0[.][00]');
}

function unformat(value) {
	return value === undefined || value === null || value === '' ?
		null :
		parseFloat(numeral(value).format('0[.][00]'));
}

function omit(object, keys) {
	return Object.keys(object).reduce(function (result, key) {
		if (keys.indexOf(key) < 0) {
			result[key] = object[key];
		}
		return result;
	}, {});
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

		// TODO: determine if component is focused initially
		return {
			focused: false,
			value: value ? format(value) : value
		};
	},

	componentWillReceiveProps: function (props) {
		var value = props.value;

		// Prevent changing the value via external entry when editing.
		if (!this.state.focused) {
			value = value ? format(value) : value;

			this.setState({
				value: value
			});
		}
	},

	_onKeyPress: function (event) {
		if (event.key && event.key.search(/^[0-9]$/) !== 0) {
			event.preventDefault();
		}
	},

	_onChange: function (event) {
		var value = event.target.value;

		// If current value is all zeroes, let the editing continue but
		// broadcast onChange event to parent with value of 0.
		if (value.search(/^0+$/g) === 0) {
			this.setState(
				{ value: value },
				function () { this.props.onChange(0); }
			);
		} else {
			value = unformat(event.target.value);
			this.setState(
				{ value: value },
				function () { this.props.onChange(value); }
			);
		}
	},

	_onBlur: function (event) {
		var value = unformat(event.target.value);
		var formatted = format(event.target.value);
		this.setState(
			{
			value: formatted,
			focused: false
		},
		function () { this.props.onBlur(value); }
		);
	},

	_onFocus: function (event) {
		var target = event.target;
		var value = unformat(event.target.value);

		// IE11/FF and React.js controlled input don't seem to play well
		// especially when value is changed on focus.
		var caret;

		if ('selectionStart' in target) {
			caret = {
				start: target.selectionStart,
				end: target.selectionEnd
			};

			// If caret is not a range but a single point, we need to make sure
			// position is maintained after removing all the commas.
			if (target.value && caret.start === caret.end) {
				caret.start -= target.value.substring(0, caret.end).replace(/[^,]/g, '').length;
				caret.end = caret.start;
			}
		}

		this.setState(
			{
			value: value,
			focused: true
		},
		function () {
			this.props.onFocus(value);

			if (caret) {
				target.setSelectionRange(caret.start, caret.end);
			}
		}
		);
	},

	render: function () {
		// TODO: re-evaluate if overriding existing event names is good

		// Handle these events internally and trigger them after they have
		// been processed internally.
		var props = omit(
			this.props,
			['onChange', 'onBlur', 'onFocus', 'onKeyPress']
		);

		props.onChange  = this._onChange;
		props.onBlur    = this._onBlur;
		props.onFocus   = this._onFocus;
		props.onKeyPress = this._onKeyPress;
		props.value     = this.state.value;

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