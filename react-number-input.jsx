//
// NumberInput formats numbers to comma-separated values after
// user loses focus of the input.
//
// Current dependencies are:
//   React, numeral.js
//
// Requires ES5 shim/sham in older browsers.
//
// Current known, potential problems:
//   * No support for negative numbers
//   * Limited/No support for decimal numbers
//

var React   = require('react');
var numeral = require('numeral');
var compose = require('underscore').compose;
var Types   = React.PropTypes;

function omit(object, keys) {
	return Object.keys(object).reduce(function (result, key) {
		if (keys.indexOf(key) < 0) {
			result[key] = object[key];
		}
		return result;
	}, {});
}

/**
 * Format given value to decimal with two significant places.
 *
 * @param   {number}
 * @returns {string}
 */
function format(value) {
	return numeral(value).format('0,0[.][00]');
}

/**
 * Remove any formatting from the given value.
 *
 * @param   {string}
 * @returns {number}
 */
function unformat(value) {
	if (typeof value === 'number') {
		return value;
	}

	return !value ? null : parseFloat(numeral(value).format('0[.][00]'));
}

var NumberInput = React.createClass({
	propTypes: {
		value: Types.number
	},

	getDefaultProps: function () {
		return {
			onBlur: function () {},
			onFocus: function () {},
			onChange: function () {},
			onKeyPress: function () {},
			type: 'tel'
		};
	},

	getInitialState: function () {
		var value = this.props.value;

		return {
			focused: false,
			value: value ? format(value) : value
		};
	},

	componentDidMount: function () {
		// Once the component is mounted, check if the input element has focus
		this.setState({
			focused: global.document.activeElement === this.refs.input.getDOMNode()
		});
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

	onKeyPress: function (event) {
		if (event.key && event.key.search(/^[0-9]$/) !== 0) {
			event.preventDefault();
		}

		event.persist();
		return event;
	},

	onChange: function (event) {
		var target = event.target;
		var value = target.value;

		// If current value is all zeroes, let the editing continue but
		// broadcast onChange event to parent with value of 0.
		if (value.search(/^0+$/g) === 0) {
			this.setState(
				{ value: value }
			);
		} else {
			value = unformat(value);
			this.setState(
				{ value: value }
			);
		}

		event.persist();
		return event;
	},

	onBlur: function (event) {
		var target    = event.target;
		var value     = unformat(target.value);
		var formatted = format(target.value);

		this.setState({
			value: formatted,
			focused: false
		});

		event.persist();
		return event;
	},

	onFocus: function (event) {
		var target = event.target;
		var value  = unformat(target.value);

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
				if (caret) {
					target.setSelectionRange(caret.start, caret.end);
				}
			}
		);

		event.persist();
		return event;
	},

	render: function () {
		var props = this.props;
		var onChange = compose(props.onChange, this.onChange);
		var onKeyPress = compose(props.onKeyPress, this.onKeyPress);
		var onFocus = compose(props.onFocus, this.onFocus);
		var onBlur = compose(props.onBlur, this.onBlur);

		return (
			<input
				ref='input'
				{...props}
				value={this.state.value}
				onChange={onChange}
				onKeyPress={onKeyPress}
				onBlur={onBlur}
				onFocus={onFocus}
			/>
		);
	}
});

module.exports = NumberInput;