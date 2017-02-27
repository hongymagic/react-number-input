'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _numbro = require('numbro');

var _numbro2 = _interopRequireDefault(_numbro);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// The default number format is an integer with thousand-separators. This can be
// changed via the prop `format` <NumberInput format="0,0[.00]" value={3.1427} />.


// <NumberInput value={VALUE_TYPE} />
//
// NumberInput takes in a number or a null value; Null value indicates that the
// input is empty i.e., '' in traditional react <input /> world. onChange event
// also takes in the VALUE_TYPE.
var DEFAULT_FORMAT = '0,0';

var formatter = function formatter(value, format) {
	var formatted = (0, _numbro2.default)(value).format(format) || '';

	if (value === null) {
		formatted = '';
	}

	return formatted;
};

var unformatter = function unformatter(value) {
	var unformatted = (0, _numbro2.default)().unformat(value) || null;
	return unformatted;
};

/// react-number-input
/// <NumberInput value={0}    /> => [    0]
/// <NumberInput value={null} /> => [     ]
/// <NumberInput value={1000} /> => [ 1000]
///
/// <input /> field which maps to a value of type `number`.

var NumberInput = function (_Component) {
	_inherits(NumberInput, _Component);

	function NumberInput(props) {
		_classCallCheck(this, NumberInput);

		var _this = _possibleConstructorReturn(this, (NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).call(this, props));

		_initialiseProps.call(_this);

		var format = props.format,
		    value = props.value;

		// TODO: Add support for starting out as focused.

		_this.state = {
			focused: false,
			value: formatter(value, format)
		};
		return _this;
	}

	_createClass(NumberInput, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			// Prevent changing value via props when input is focused.
			if (!this.state.focused && 'value' in nextProps) {
				this.setState({
					value: formatter(nextProps.value, nextProps.format || this.props.format || DEFAULT_FORMAT)
				});
			}
		}
	}, {
		key: 'render',
		value: function render() {
			var _state = this.state,
			    focused = _state.focused,
			    value = _state.value;

			var _props = this.props,
			    format = _props.format,
			    rest = _objectWithoutProperties(_props, ['format']);

			var displayValue = focused ? value : formatter(unformatter(value), format);

			return _react2.default.createElement('input', _extends({}, rest, {
				value: displayValue || '',
				onFocus: this.onFocus,
				onBlur: this.onBlur,
				onChange: this.onChange
			}));
		}
	}]);

	return NumberInput;
}(_react.Component);

NumberInput.defaultProps = {
	format: DEFAULT_FORMAT,
	type: 'tel',
	onChange: function onChange(value) {
		return value;
	}
};

var _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this.onBlur = function (event) {
		if ('persist' in event) {
			event.persist();
		}
		_this2.setState({ focused: false }, function () {
			return _this2.props.onBlur(event);
		});
	};

	this.onFocus = function (event) {
		if ('persist' in event) {
			event.persist();
		}
		_this2.setState({
			focused: true,
			value: '' + (unformatter(_this2.state.value) || '')
		}, function () {
			return _this2.props.onFocus(event);
		});
	};

	this.onChange = function (event) {
		var value = event.target.value;

		if ('persist' in event) {
			event.persist();
		}
		_this2.setState({ value: value }, function () {
			return _this2.props.onChange(unformatter(value), event);
		});
	};
};

exports.default = NumberInput;