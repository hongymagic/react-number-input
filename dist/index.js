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

var DEFAULT_FORMAT = '0,0';

var toFormattedString = function toFormattedString(value, format) {
	var boxed = (0, _numbro2.default)(value);

	if (isNaN(boxed.value())) {
		return '';
	}

	return boxed.format(format) || '';
};

var toValue = function toValue(value) {
	var unformatted = (0, _numbro2.default)().unformat(value) || null;
	return unformatted;
};

var normalisedValue = function normalisedValue(value, format) {
	return toValue(toFormattedString(toValue(value), format));
};

var NumberInput = function (_Component) {
	_inherits(NumberInput, _Component);

	function NumberInput(props) {
		_classCallCheck(this, NumberInput);

		var _this = _possibleConstructorReturn(this, (NumberInput.__proto__ || Object.getPrototypeOf(NumberInput)).call(this, props));

		_initialiseProps.call(_this);

		var format = props.format,
		    value = props.value;

		_this.state = {
			focused: false,
			value: toFormattedString(value, format)
		};
		return _this;
	}

	_createClass(NumberInput, [{
		key: 'componentWillReceiveProps',
		value: function componentWillReceiveProps(nextProps) {
			if (!this.state.focused && 'value' in nextProps) {
				this.setState({
					value: toFormattedString(nextProps.value, nextProps.format || this.props.format || DEFAULT_FORMAT)
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

			var displayValue = focused ? value : toFormattedString(toValue(value), format);

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
	},
	onBlur: function onBlur(value) {
		return null;
	},
	onFocus: function onFocus(value) {
		return null;
	}
};

var _initialiseProps = function _initialiseProps() {
	var _this2 = this;

	this.onBlur = function (event) {
		var _props2 = _this2.props,
		    format = _props2.format,
		    onBlur = _props2.onBlur;


		if ('persist' in event) {
			event.persist();
		}
		_this2.setState({
			focused: false,
			value: toFormattedString(toValue(_this2.state.value), format)
		}, function () {
			return onBlur(event);
		});
	};

	this.onFocus = function (event) {
		if ('persist' in event) {
			event.persist();
		}
		_this2.setState({
			focused: true,
			value: '' + (toValue(_this2.state.value) || '')
		}, function () {
			return _this2.props.onFocus(event);
		});
	};

	this.onChange = function (event) {
		var value = event.target.value;
		var _props3 = _this2.props,
		    format = _props3.format,
		    onChange = _props3.onChange;


		if ('persist' in event) {
			event.persist();
		}
		_this2.setState({ value: value }, function () {
			return onChange(normalisedValue(value, format), event);
		});
	};
};

exports.default = NumberInput;