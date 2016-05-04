(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactNumberInput"] = factory(require("react"));
	else
		root["ReactNumberInput"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_41__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "build/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {//
	// NumberInput formats numbers to comma-separated values after
	// user loses focus of the input.
	//
	// Current dependencies are:
	//   React@^15.0.1, numbro.js (fork of numeral.js)
	//
	// Requires ES5 shim/sham in older browsers.
	//
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; desc = parent = undefined; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	exports.isNumber = isNumber;
	exports.toNumeral = toNumeral;
	exports.parseNumber = parseNumber;
	exports.formatNumber = formatNumber;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _objectAssign = __webpack_require__(1);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _numbro = __webpack_require__(2);
	
	var _numbro2 = _interopRequireDefault(_numbro);
	
	var _react = __webpack_require__(41);
	
	var DEFAULT_NUMBER_FORMAT = '0,0[.][00]';
	
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
	
		if (type === 'object' || type === 'function' || type === 'boolean') {
			return null;
		}
	
		var n = (0, _numbro2['default'])(value);
	
		// numeral.js converts empty strings into 0 for no reason, so if given
		// value was not '0' or 0, treat it as null.
		if (n.value() === 0 && value !== 0 && value !== '0') {
			return null;
		}
	
		// numeral.js can sometimes convert values (like '4.5.2') into NaN
		// and we would rather null than NaN.
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
		return n ? n.value() : NaN;
	}
	
	/**
	 * Apply number formatting to given number value. If given value cannot be
	 * converted to a number, returns null.
	 *
	 * @param   {any}
	 * @returns {string}
	 */
	
	function formatNumber(value) {
		var format = arguments.length <= 1 || arguments[1] === undefined ? DEFAULT_NUMBER_FORMAT : arguments[1];
	
		var n = toNumeral(value);
		return n ? n.format(format) : null;
	}
	
	/**
	 * <NumberInput /> component
	 *
	 * @param   {Number} value
	 * @returns {Component}
	 */
	
	var NumberInput = (function (_Component) {
		_inherits(NumberInput, _Component);
	
		function NumberInput(props) {
			_classCallCheck(this, NumberInput);
	
			_get(Object.getPrototypeOf(NumberInput.prototype), 'constructor', this).call(this, props);
	
			// Load numbro culture before performing any number parsing
			this.loadCulture(props);
	
			var value = parseNumber(this.props.value);
	
			// focused: keep track of the input's focus state
			// numeral: keep track of the input's current value (numeral object)
			this.state = {
				focused: false,
				value: isNumber(value) ? value : ''
			};
	
			this.onChange = this.onChange.bind(this);
			this.onFocus = this.onFocus.bind(this);
			this.onBlur = this.onBlur.bind(this);
		}
	
		_createClass(NumberInput, [{
			key: 'componentWillReceiveProps',
			value: function componentWillReceiveProps(props) {
				this.loadCulture(props);
	
				// Prevent changing the value via external entry when editing.
				if (!this.state.focused && 'value' in props) {
					var value = parseNumber(props.value);
					this.setState({ value: isNumber(value) ? value : '' });
				}
			}
		}, {
			key: 'componentDidMount',
			value: function componentDidMount() {
				// focused: check if component is focused after mounting and set state
				this.setState({
					focused: global.document.activeElement === this.refs.input
				});
			}
		}, {
			key: 'loadCulture',
			value: function loadCulture(props) {
				_numbro2['default'].loadCulturesInNode();
	
				if (props && props.culture) {
					_numbro2['default'].culture(props.culture);
				}
			}
		}, {
			key: 'onChange',
			value: function onChange(event) {
				var _this = this;
	
				event.persist();
				this.setState({ value: event.target.value }, function () {
					return _this.props.onChange(event);
				});
			}
		}, {
			key: 'onBlur',
			value: function onBlur(event) {
				var _this2 = this;
	
				event.persist();
				var n = toNumeral(event.target.value);
	
				// If given value is lower than minimum, set the value to minimum
				if (n && 'min' in this.props && n.value() < this.props.min) {
					n = toNumeral(this.props.min);
				}
	
				// If given value is greater than maximum, set the value to maximum
				if (n && 'max' in this.props && n.value() > this.props.max) {
					n = toNumeral(this.props.max);
				}
	
				// Set the event target value to corrected value
				event.target.value = n ? n.value() : '';
	
				this.setState({
					focused: false,
					value: n ? n.format(this.props.format) : ''
				}, function () {
					return _this2.props.onBlur(event);
				});
			}
		}, {
			key: 'onFocus',
			value: function onFocus(event) {
				var _this3 = this;
	
				event.persist();
				var n = toNumeral(event.target.value);
				this.setState({
					focused: true,
					value: n ? n.value() : ''
				}, function () {
					return _this3.props.onFocus(event);
				});
			}
		}, {
			key: 'valueAsFormatted',
			value: function valueAsFormatted() {
				var value = this.state.value;
				var n = toNumeral(value);
	
				return n ? n.format(this.props.format) : '';
			}
		}, {
			key: 'render',
			value: function render() {
				var value = this.state.focused ? this.state.value : this.valueAsFormatted();
				return (0, _react.createElement)('input', (0, _objectAssign2['default'])({}, this.props, {
					ref: 'input',
					onChange: this.onChange,
					onFocus: this.onFocus,
					onBlur: this.onBlur,
					value: value
				}));
			}
		}]);
	
		return NumberInput;
	})(_react.Component);
	
	exports['default'] = NumberInput;
	
	NumberInput.propTypes = {
		value: _react.PropTypes.any,
		type: _react.PropTypes.string,
		format: _react.PropTypes.string,
		min: _react.PropTypes.number,
		max: _react.PropTypes.number,
		culture: _react.PropTypes.string,
		onFocus: _react.PropTypes.func,
		onBlur: _react.PropTypes.func,
		onChange: _react.PropTypes.func
	};
	
	NumberInput.defaultProps = {
		value: null,
		type: 'tel',
		format: DEFAULT_NUMBER_FORMAT,
		culture: 'en-US',
		onFocus: function onFocus() {},
		onBlur: function onBlur() {},
		onChange: function onChange() {}
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports) {

	'use strict';
	/* eslint-disable no-unused-vars */
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	function shouldUseNative() {
		try {
			if (!Object.assign) {
				return false;
			}
	
			// Detect buggy property enumeration order in older V8 versions.
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=4118
			var test1 = new String('abc'); // eslint-disable-line
			test1[5] = 'de';
			if (Object.getOwnPropertyNames(test1)[0] === '5') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test2 = {};
			for (var i = 0; i < 10; i++) {
				test2['_' + String.fromCharCode(i)] = i;
			}
			var order2 = Object.getOwnPropertyNames(test2).map(function (n) {
				return test2[n];
			});
			if (order2.join('') !== '0123456789') {
				return false;
			}
	
			// https://bugs.chromium.org/p/v8/issues/detail?id=3056
			var test3 = {};
			'abcdefghijklmnopqrst'.split('').forEach(function (letter) {
				test3[letter] = letter;
			});
			if (Object.keys(Object.assign({}, test3)).join('') !== 'abcdefghijklmnopqrst') {
				return false;
			}
	
			return true;
		} catch (e) {
			// We don't expect any of the above to throw, but better to be safe.
			return false;
		}
	}
	
	module.exports = shouldUseNative() ? Object.assign : function (target, source) {
		var from;
		var to = toObject(target);
		var symbols;
	
		for (var s = 1; s < arguments.length; s++) {
			from = Object(arguments[s]);
	
			for (var key in from) {
				if (hasOwnProperty.call(from, key)) {
					to[key] = from[key];
				}
			}
	
			if (Object.getOwnPropertySymbols) {
				symbols = Object.getOwnPropertySymbols(from);
				for (var i = 0; i < symbols.length; i++) {
					if (propIsEnumerable.call(from, symbols[i])) {
						to[symbols[i]] = from[symbols[i]];
					}
				}
			}
		}
	
		return to;
	};

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/* WEBPACK VAR INJECTION */(function(process) {/*!
	 * numbro.js
	 * version : 1.7.1
	 * author : Företagsplatsen AB
	 * license : MIT
	 * http://www.foretagsplatsen.se
	 */
	
	'use strict';
	
	(function () {
	    'use strict';
	
	    /************************************
	        Constants
	    ************************************/
	
	    var numbro,
	        VERSION = '1.7.1',
	
	    // internal storage for culture config files
	    cultures = {},
	
	    // Todo: Remove in 2.0.0
	    languages = cultures,
	        currentCulture = 'en-US',
	        zeroFormat = null,
	        defaultFormat = '0,0',
	        defaultCurrencyFormat = '0$',
	
	    // check for nodeJS
	    hasModule = typeof module !== 'undefined' && module.exports,
	
	    // default culture
	    enUS = {
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function ordinal(number) {
	            var b = number % 10;
	            return ~ ~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
	        },
	        currency: {
	            symbol: '$',
	            position: 'prefix'
	        },
	        defaults: {
	            currencyFormat: ',0000 a'
	        },
	        formats: {
	            fourDigits: '0000 a',
	            fullWithTwoDecimals: '$ ,0.00',
	            fullWithTwoDecimalsNoCurrency: ',0.00'
	        }
	    };
	
	    /************************************
	        Constructors
	    ************************************/
	
	    // Numbro prototype object
	    function Numbro(number) {
	        this._value = number;
	    }
	
	    function zeroes(count) {
	        var i,
	            ret = '';
	
	        for (i = 0; i < count; i++) {
	            ret += '0';
	        }
	
	        return ret;
	    }
	    /**
	     * Implementation of toFixed() for numbers with exponents
	     * This function may return negative representations for zero values e.g. "-0.0"
	     */
	    function toFixedLargeSmall(value, precision) {
	        var mantissa, beforeDec, afterDec, exponent, prefix, endStr, zerosStr, str;
	
	        str = value.toString();
	
	        mantissa = str.split('e')[0];
	        exponent = str.split('e')[1];
	
	        beforeDec = mantissa.split('.')[0];
	        afterDec = mantissa.split('.')[1] || '';
	
	        if (+exponent > 0) {
	            // exponent is positive - add zeros after the numbers
	            str = beforeDec + afterDec + zeroes(exponent - afterDec.length);
	        } else {
	            // exponent is negative
	
	            if (+beforeDec < 0) {
	                prefix = '-0';
	            } else {
	                prefix = '0';
	            }
	
	            // tack on the decimal point if needed
	            if (precision > 0) {
	                prefix += '.';
	            }
	
	            zerosStr = zeroes(-1 * exponent - 1);
	            // substring off the end to satisfy the precision
	            endStr = (zerosStr + Math.abs(beforeDec) + afterDec).substr(0, precision);
	            str = prefix + endStr;
	        }
	
	        // only add percision 0's if the exponent is positive
	        if (+exponent > 0 && precision > 0) {
	            str += '.' + zeroes(precision);
	        }
	
	        return str;
	    }
	
	    /**
	     * Implementation of toFixed() that treats floats more like decimals
	     *
	     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
	     * problems for accounting- and finance-related software.
	     *
	     * Also removes negative signs for zero-formatted numbers. e.g. -0.01 w/ precision 1 -> 0.0
	     */
	    function toFixed(value, precision, roundingFunction, optionals) {
	        var power = Math.pow(10, precision),
	            optionalsRegExp,
	            output;
	
	        if (value.toString().indexOf('e') > -1) {
	            // toFixed returns scientific notation for numbers above 1e21 and below 1e-7
	            output = toFixedLargeSmall(value, precision);
	            // remove the leading negative sign if it exists and should not be present (e.g. -0.00)
	            if (output.charAt(0) === '-' && +output >= 0) {
	                output = output.substr(1); // chop off the '-'
	            }
	        } else {
	                // Multiply up by precision, round accurately, then divide and use native toFixed():
	                output = (roundingFunction(value + 'e+' + precision) / power).toFixed(precision);
	            }
	
	        if (optionals) {
	            optionalsRegExp = new RegExp('0{1,' + optionals + '}$');
	            output = output.replace(optionalsRegExp, '');
	        }
	
	        return output;
	    }
	
	    /************************************
	        Formatting
	    ************************************/
	
	    // determine what type of formatting we need to do
	    function formatNumbro(n, format, roundingFunction) {
	        var output,
	            escapedFormat = format.replace(/\{[^\{\}]*\}/g, '');
	
	        // figure out what kind of format we are dealing with
	        if (escapedFormat.indexOf('$') > -1) {
	            // currency!!!!!
	            output = _formatCurrency(n, format, roundingFunction);
	        } else if (escapedFormat.indexOf('%') > -1) {
	            // percentage
	            output = formatPercentage(n, format, roundingFunction);
	        } else if (escapedFormat.indexOf(':') > -1) {
	            // time
	            output = formatTime(n, format);
	        } else {
	            // plain ol' numbers or bytes
	            output = formatNumber(n._value, format, roundingFunction);
	        }
	
	        // return string
	        return output;
	    }
	
	    // revert to number
	    function unformatNumbro(n, string) {
	        var stringOriginal = string,
	            thousandRegExp,
	            millionRegExp,
	            billionRegExp,
	            trillionRegExp,
	            binarySuffixes = ['KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
	            decimalSuffixes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	            bytesMultiplier = false,
	            power;
	
	        if (string.indexOf(':') > -1) {
	            n._value = unformatTime(string);
	        } else {
	            if (string === zeroFormat) {
	                n._value = 0;
	            } else {
	                if (cultures[currentCulture].delimiters.decimal !== '.') {
	                    string = string.replace(/\./g, '').replace(cultures[currentCulture].delimiters.decimal, '.');
	                }
	
	                // see if abbreviations are there so that we can multiply to the correct number
	                thousandRegExp = new RegExp('[^a-zA-Z]' + cultures[currentCulture].abbreviations.thousand + '(?:\\)|(\\' + cultures[currentCulture].currency.symbol + ')?(?:\\))?)?$');
	                millionRegExp = new RegExp('[^a-zA-Z]' + cultures[currentCulture].abbreviations.million + '(?:\\)|(\\' + cultures[currentCulture].currency.symbol + ')?(?:\\))?)?$');
	                billionRegExp = new RegExp('[^a-zA-Z]' + cultures[currentCulture].abbreviations.billion + '(?:\\)|(\\' + cultures[currentCulture].currency.symbol + ')?(?:\\))?)?$');
	                trillionRegExp = new RegExp('[^a-zA-Z]' + cultures[currentCulture].abbreviations.trillion + '(?:\\)|(\\' + cultures[currentCulture].currency.symbol + ')?(?:\\))?)?$');
	
	                // see if bytes are there so that we can multiply to the correct number
	                for (power = 0; power <= binarySuffixes.length && !bytesMultiplier; power++) {
	                    if (string.indexOf(binarySuffixes[power]) > -1) {
	                        bytesMultiplier = Math.pow(1024, power + 1);
	                    } else if (string.indexOf(decimalSuffixes[power]) > -1) {
	                        bytesMultiplier = Math.pow(1000, power + 1);
	                    }
	                }
	
	                // do some math to create our number
	                n._value = (bytesMultiplier ? bytesMultiplier : 1) * (stringOriginal.match(thousandRegExp) ? Math.pow(10, 3) : 1) * (stringOriginal.match(millionRegExp) ? Math.pow(10, 6) : 1) * (stringOriginal.match(billionRegExp) ? Math.pow(10, 9) : 1) * (stringOriginal.match(trillionRegExp) ? Math.pow(10, 12) : 1) * (string.indexOf('%') > -1 ? 0.01 : 1) * ((string.split('-').length + Math.min(string.split('(').length - 1, string.split(')').length - 1)) % 2 ? 1 : -1) * Number(string.replace(/[^0-9\.]+/g, ''));
	
	                // round if we are talking about bytes
	                n._value = bytesMultiplier ? Math.ceil(n._value) : n._value;
	            }
	        }
	        return n._value;
	    }
	
	    function _formatCurrency(n, originalFormat, roundingFunction) {
	        var format = originalFormat,
	            symbolIndex = format.indexOf('$'),
	            openParenIndex = format.indexOf('('),
	            plusSignIndex = format.indexOf('+'),
	            minusSignIndex = format.indexOf('-'),
	            space = '',
	            decimalSeparator = '',
	            spliceIndex,
	            output;
	
	        if (format.indexOf('$') === -1) {
	            // Use defaults instead of the format provided
	            if (cultures[currentCulture].currency.position === 'infix') {
	                decimalSeparator = cultures[currentCulture].currency.symbol;
	                if (cultures[currentCulture].currency.spaceSeparated) {
	                    decimalSeparator = ' ' + decimalSeparator + ' ';
	                }
	            } else if (cultures[currentCulture].currency.spaceSeparated) {
	                space = ' ';
	            }
	        } else {
	            // check for space before or after currency
	            if (format.indexOf(' $') > -1) {
	                space = ' ';
	                format = format.replace(' $', '');
	            } else if (format.indexOf('$ ') > -1) {
	                space = ' ';
	                format = format.replace('$ ', '');
	            } else {
	                format = format.replace('$', '');
	            }
	        }
	
	        // Format The Number
	        output = formatNumber(n._value, format, roundingFunction, decimalSeparator);
	
	        if (originalFormat.indexOf('$') === -1) {
	            // Use defaults instead of the format provided
	            switch (cultures[currentCulture].currency.position) {
	                case 'postfix':
	                    if (output.indexOf(')') > -1) {
	                        output = output.split('');
	                        output.splice(-1, 0, space + cultures[currentCulture].currency.symbol);
	                        output = output.join('');
	                    } else {
	                        output = output + space + cultures[currentCulture].currency.symbol;
	                    }
	                    break;
	                case 'infix':
	                    break;
	                case 'prefix':
	                    if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
	                        output = output.split('');
	                        spliceIndex = Math.max(openParenIndex, minusSignIndex) + 1;
	
	                        output.splice(spliceIndex, 0, cultures[currentCulture].currency.symbol + space);
	                        output = output.join('');
	                    } else {
	                        output = cultures[currentCulture].currency.symbol + space + output;
	                    }
	                    break;
	                default:
	                    throw Error('Currency position should be among ["prefix", "infix", "postfix"]');
	            }
	        } else {
	            // position the symbol
	            if (symbolIndex <= 1) {
	                if (output.indexOf('(') > -1 || output.indexOf('+') > -1 || output.indexOf('-') > -1) {
	                    output = output.split('');
	                    spliceIndex = 1;
	                    if (symbolIndex < openParenIndex || symbolIndex < plusSignIndex || symbolIndex < minusSignIndex) {
	                        // the symbol appears before the "(", "+" or "-"
	                        spliceIndex = 0;
	                    }
	                    output.splice(spliceIndex, 0, cultures[currentCulture].currency.symbol + space);
	                    output = output.join('');
	                } else {
	                    output = cultures[currentCulture].currency.symbol + space + output;
	                }
	            } else {
	                if (output.indexOf(')') > -1) {
	                    output = output.split('');
	                    output.splice(-1, 0, space + cultures[currentCulture].currency.symbol);
	                    output = output.join('');
	                } else {
	                    output = output + space + cultures[currentCulture].currency.symbol;
	                }
	            }
	        }
	
	        return output;
	    }
	
	    function formatPercentage(n, format, roundingFunction) {
	        var space = '',
	            output,
	            value = n._value * 100;
	
	        // check for space before %
	        if (format.indexOf(' %') > -1) {
	            space = ' ';
	            format = format.replace(' %', '');
	        } else {
	            format = format.replace('%', '');
	        }
	
	        output = formatNumber(value, format, roundingFunction);
	
	        if (output.indexOf(')') > -1) {
	            output = output.split('');
	            output.splice(-1, 0, space + '%');
	            output = output.join('');
	        } else {
	            output = output + space + '%';
	        }
	
	        return output;
	    }
	
	    function formatTime(n) {
	        var hours = Math.floor(n._value / 60 / 60),
	            minutes = Math.floor((n._value - hours * 60 * 60) / 60),
	            seconds = Math.round(n._value - hours * 60 * 60 - minutes * 60);
	        return hours + ':' + (minutes < 10 ? '0' + minutes : minutes) + ':' + (seconds < 10 ? '0' + seconds : seconds);
	    }
	
	    function unformatTime(string) {
	        var timeArray = string.split(':'),
	            seconds = 0;
	        // turn hours and minutes into seconds and add them all up
	        if (timeArray.length === 3) {
	            // hours
	            seconds = seconds + Number(timeArray[0]) * 60 * 60;
	            // minutes
	            seconds = seconds + Number(timeArray[1]) * 60;
	            // seconds
	            seconds = seconds + Number(timeArray[2]);
	        } else if (timeArray.length === 2) {
	            // minutes
	            seconds = seconds + Number(timeArray[0]) * 60;
	            // seconds
	            seconds = seconds + Number(timeArray[1]);
	        }
	        return Number(seconds);
	    }
	
	    function formatNumber(value, format, roundingFunction, sep) {
	        var negP = false,
	            signed = false,
	            optDec = false,
	            abbr = '',
	            i,
	            abbrK = false,
	            // force abbreviation to thousands
	        abbrM = false,
	            // force abbreviation to millions
	        abbrB = false,
	            // force abbreviation to billions
	        abbrT = false,
	            // force abbreviation to trillions
	        abbrForce = false,
	            // force abbreviation
	        bytes = '',
	            ord = '',
	            abs = Math.abs(value),
	            binarySuffixes = ['B', 'KiB', 'MiB', 'GiB', 'TiB', 'PiB', 'EiB', 'ZiB', 'YiB'],
	            decimalSuffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	            min,
	            max,
	            power,
	            totalLength,
	            length,
	            minimumPrecision,
	            pow,
	            w,
	            intPrecision,
	            precision,
	            prefix,
	            postfix,
	            thousands,
	            d = '',
	            forcedNeg = false,
	            neg = false,
	            indexOpenP,
	            size,
	            indexMinus,
	            paren = '',
	            minlen;
	
	        // check if number is zero and a custom zero format has been set
	        if (value === 0 && zeroFormat !== null) {
	            return zeroFormat;
	        }
	
	        if (!isFinite(value)) {
	            return '' + value;
	        }
	
	        if (format.indexOf('{') === 0) {
	            var end = format.indexOf('}');
	            if (end === -1) {
	                throw Error('Format should also contain a "}"');
	            }
	            prefix = format.slice(1, end);
	            format = format.slice(end + 1);
	        } else {
	            prefix = '';
	        }
	
	        if (format.indexOf('}') === format.length - 1) {
	            var start = format.indexOf('{');
	            if (start === -1) {
	                throw Error('Format should also contain a "{"');
	            }
	            postfix = format.slice(start + 1, -1);
	            format = format.slice(0, start + 1);
	        } else {
	            postfix = '';
	        }
	
	        // check for min length
	        var info;
	        if (format.indexOf('.') === -1) {
	            info = format.match(/([0-9]+).*/);
	        } else {
	            info = format.match(/([0-9]+)\..*/);
	        }
	        minlen = info === null ? -1 : info[1].length;
	
	        // see if we should use parentheses for negative number or if we should prefix with a sign
	        // if both are present we default to parentheses
	        if (format.indexOf('-') !== -1) {
	            forcedNeg = true;
	        }
	        if (format.indexOf('(') > -1) {
	            negP = true;
	            format = format.slice(1, -1);
	        } else if (format.indexOf('+') > -1) {
	            signed = true;
	            format = format.replace(/\+/g, '');
	        }
	
	        // see if abbreviation is wanted
	        if (format.indexOf('a') > -1) {
	            intPrecision = format.split('.')[0].match(/[0-9]+/g) || ['0'];
	            intPrecision = parseInt(intPrecision[0], 10);
	
	            // check if abbreviation is specified
	            abbrK = format.indexOf('aK') >= 0;
	            abbrM = format.indexOf('aM') >= 0;
	            abbrB = format.indexOf('aB') >= 0;
	            abbrT = format.indexOf('aT') >= 0;
	            abbrForce = abbrK || abbrM || abbrB || abbrT;
	
	            // check for space before abbreviation
	            if (format.indexOf(' a') > -1) {
	                abbr = ' ';
	                format = format.replace(' a', '');
	            } else {
	                format = format.replace('a', '');
	            }
	
	            totalLength = Math.floor(Math.log(abs) / Math.LN10) + 1;
	
	            minimumPrecision = totalLength % 3;
	            minimumPrecision = minimumPrecision === 0 ? 3 : minimumPrecision;
	
	            if (intPrecision && abs !== 0) {
	
	                length = Math.floor(Math.log(abs) / Math.LN10) + 1 - intPrecision;
	
	                pow = 3 * ~ ~((Math.min(intPrecision, totalLength) - minimumPrecision) / 3);
	
	                abs = abs / Math.pow(10, pow);
	
	                if (format.indexOf('.') === -1 && intPrecision > 3) {
	                    format += '[.]';
	
	                    size = length === 0 ? 0 : 3 * ~ ~(length / 3) - length;
	                    size = size < 0 ? size + 3 : size;
	
	                    for (i = 0; i < size; i++) {
	                        format += '0';
	                    }
	                }
	            }
	
	            if (Math.floor(Math.log(Math.abs(value)) / Math.LN10) + 1 !== intPrecision) {
	                if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {
	                    // trillion
	                    abbr = abbr + cultures[currentCulture].abbreviations.trillion;
	                    value = value / Math.pow(10, 12);
	                } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {
	                    // billion
	                    abbr = abbr + cultures[currentCulture].abbreviations.billion;
	                    value = value / Math.pow(10, 9);
	                } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {
	                    // million
	                    abbr = abbr + cultures[currentCulture].abbreviations.million;
	                    value = value / Math.pow(10, 6);
	                } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {
	                    // thousand
	                    abbr = abbr + cultures[currentCulture].abbreviations.thousand;
	                    value = value / Math.pow(10, 3);
	                }
	            }
	        }
	
	        // see if we are formatting binary bytes
	        if (format.indexOf('b') > -1) {
	            // check for space before
	            if (format.indexOf(' b') > -1) {
	                bytes = ' ';
	                format = format.replace(' b', '');
	            } else {
	                format = format.replace('b', '');
	            }
	
	            for (power = 0; power <= binarySuffixes.length; power++) {
	                min = Math.pow(1024, power);
	                max = Math.pow(1024, power + 1);
	
	                if (value >= min && value < max) {
	                    bytes = bytes + binarySuffixes[power];
	                    if (min > 0) {
	                        value = value / min;
	                    }
	                    break;
	                }
	            }
	        }
	
	        // see if we are formatting decimal bytes
	        if (format.indexOf('d') > -1) {
	            // check for space before
	            if (format.indexOf(' d') > -1) {
	                bytes = ' ';
	                format = format.replace(' d', '');
	            } else {
	                format = format.replace('d', '');
	            }
	
	            for (power = 0; power <= decimalSuffixes.length; power++) {
	                min = Math.pow(1000, power);
	                max = Math.pow(1000, power + 1);
	
	                if (value >= min && value < max) {
	                    bytes = bytes + decimalSuffixes[power];
	                    if (min > 0) {
	                        value = value / min;
	                    }
	                    break;
	                }
	            }
	        }
	
	        // see if ordinal is wanted
	        if (format.indexOf('o') > -1) {
	            // check for space before
	            if (format.indexOf(' o') > -1) {
	                ord = ' ';
	                format = format.replace(' o', '');
	            } else {
	                format = format.replace('o', '');
	            }
	
	            if (cultures[currentCulture].ordinal) {
	                ord = ord + cultures[currentCulture].ordinal(value);
	            }
	        }
	
	        if (format.indexOf('[.]') > -1) {
	            optDec = true;
	            format = format.replace('[.]', '.');
	        }
	
	        w = value.toString().split('.')[0];
	        precision = format.split('.')[1];
	        thousands = format.indexOf(',');
	
	        if (precision) {
	            if (precision.indexOf('*') !== -1) {
	                d = toFixed(value, value.toString().split('.')[1].length, roundingFunction);
	            } else {
	                if (precision.indexOf('[') > -1) {
	                    precision = precision.replace(']', '');
	                    precision = precision.split('[');
	                    d = toFixed(value, precision[0].length + precision[1].length, roundingFunction, precision[1].length);
	                } else {
	                    d = toFixed(value, precision.length, roundingFunction);
	                }
	            }
	
	            w = d.split('.')[0];
	
	            if (d.split('.')[1].length) {
	                var p = sep ? abbr + sep : cultures[currentCulture].delimiters.decimal;
	                d = p + d.split('.')[1];
	            } else {
	                d = '';
	            }
	
	            if (optDec && Number(d.slice(1)) === 0) {
	                d = '';
	            }
	        } else {
	            w = toFixed(value, 0, roundingFunction);
	        }
	
	        // format number
	        if (w.indexOf('-') > -1) {
	            w = w.slice(1);
	            neg = true;
	        }
	
	        if (w.length < minlen) {
	            w = new Array(minlen - w.length + 1).join('0') + w;
	        }
	
	        if (thousands > -1) {
	            w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + cultures[currentCulture].delimiters.thousands);
	        }
	
	        if (format.indexOf('.') === 0) {
	            w = '';
	        }
	
	        indexOpenP = format.indexOf('(');
	        indexMinus = format.indexOf('-');
	
	        if (indexOpenP < indexMinus) {
	            paren = (negP && neg ? '(' : '') + (forcedNeg && neg || !negP && neg ? '-' : '');
	        } else {
	            paren = (forcedNeg && neg || !negP && neg ? '-' : '') + (negP && neg ? '(' : '');
	        }
	
	        return prefix + paren + (!neg && signed && value !== 0 ? '+' : '') + w + d + (ord ? ord : '') + (abbr && !sep ? abbr : '') + (bytes ? bytes : '') + (negP && neg ? ')' : '') + postfix;
	    }
	
	    /************************************
	        Top Level Functions
	    ************************************/
	
	    numbro = function (input) {
	        if (numbro.isNumbro(input)) {
	            input = input.value();
	        } else if (input === 0 || typeof input === 'undefined') {
	            input = 0;
	        } else if (!Number(input)) {
	            input = numbro.fn.unformat(input);
	        }
	
	        return new Numbro(Number(input));
	    };
	
	    // version number
	    numbro.version = VERSION;
	
	    // compare numbro object
	    numbro.isNumbro = function (obj) {
	        return obj instanceof Numbro;
	    };
	
	    /**
	     * This function allow the user to set a new language with a fallback if
	     * the language does not exist. If no fallback language is provided,
	     * it fallbacks to english.
	     *
	     * @deprecated Since in version 1.6.0. It will be deleted in version 2.0
	     * `setCulture` should be used instead.
	     */
	    numbro.setLanguage = function (newLanguage, fallbackLanguage) {
	        console.warn('`setLanguage` is deprecated since version 1.6.0. Use `setCulture` instead');
	        var key = newLanguage,
	            prefix = newLanguage.split('-')[0],
	            matchingLanguage = null;
	        if (!languages[key]) {
	            Object.keys(languages).forEach(function (language) {
	                if (!matchingLanguage && language.split('-')[0] === prefix) {
	                    matchingLanguage = language;
	                }
	            });
	            key = matchingLanguage || fallbackLanguage || 'en-US';
	        }
	        chooseCulture(key);
	    };
	
	    /**
	     * This function allow the user to set a new culture with a fallback if
	     * the culture does not exist. If no fallback culture is provided,
	     * it fallbacks to "en-US".
	     */
	    numbro.setCulture = function (newCulture, fallbackCulture) {
	        var key = newCulture,
	            suffix = newCulture.split('-')[1],
	            matchingCulture = null;
	        if (!cultures[key]) {
	            if (suffix) {
	                Object.keys(cultures).forEach(function (language) {
	                    if (!matchingCulture && language.split('-')[1] === suffix) {
	                        matchingCulture = language;
	                    }
	                });
	            }
	
	            key = matchingCulture || fallbackCulture || 'en-US';
	        }
	        chooseCulture(key);
	    };
	
	    /**
	     * This function will load languages and then set the global language.  If
	     * no arguments are passed in, it will simply return the current global
	     * language key.
	     *
	     * @deprecated Since in version 1.6.0. It will be deleted in version 2.0
	     * `culture` should be used instead.
	     */
	    numbro.language = function (key, values) {
	        console.warn('`language` is deprecated since version 1.6.0. Use `culture` instead');
	
	        if (!key) {
	            return currentCulture;
	        }
	
	        if (key && !values) {
	            if (!languages[key]) {
	                throw new Error('Unknown language : ' + key);
	            }
	            chooseCulture(key);
	        }
	
	        if (values || !languages[key]) {
	            setCulture(key, values);
	        }
	
	        return numbro;
	    };
	
	    /**
	     * This function will load cultures and then set the global culture.  If
	     * no arguments are passed in, it will simply return the current global
	     * culture code.
	     */
	    numbro.culture = function (code, values) {
	        if (!code) {
	            return currentCulture;
	        }
	
	        if (code && !values) {
	            if (!cultures[code]) {
	                throw new Error('Unknown culture : ' + code);
	            }
	            chooseCulture(code);
	        }
	
	        if (values || !cultures[code]) {
	            setCulture(code, values);
	        }
	
	        return numbro;
	    };
	
	    /**
	     * This function provides access to the loaded language data.  If
	     * no arguments are passed in, it will simply return the current
	     * global language object.
	     *
	     * @deprecated Since in version 1.6.0. It will be deleted in version 2.0
	     * `culture` should be used instead.
	     */
	    numbro.languageData = function (key) {
	        console.warn('`languageData` is deprecated since version 1.6.0. Use `cultureData` instead');
	
	        if (!key) {
	            return languages[currentCulture];
	        }
	
	        if (!languages[key]) {
	            throw new Error('Unknown language : ' + key);
	        }
	
	        return languages[key];
	    };
	
	    /**
	     * This function provides access to the loaded culture data.  If
	     * no arguments are passed in, it will simply return the current
	     * global culture object.
	     */
	    numbro.cultureData = function (code) {
	        if (!code) {
	            return cultures[currentCulture];
	        }
	
	        if (!cultures[code]) {
	            throw new Error('Unknown culture : ' + code);
	        }
	
	        return cultures[code];
	    };
	
	    numbro.culture('en-US', enUS);
	
	    /**
	     * @deprecated Since in version 1.6.0. It will be deleted in version 2.0
	     * `cultures` should be used instead.
	     */
	    numbro.languages = function () {
	        console.warn('`languages` is deprecated since version 1.6.0. Use `cultures` instead');
	
	        return languages;
	    };
	
	    numbro.cultures = function () {
	        return cultures;
	    };
	
	    numbro.zeroFormat = function (format) {
	        zeroFormat = typeof format === 'string' ? format : null;
	    };
	
	    numbro.defaultFormat = function (format) {
	        defaultFormat = typeof format === 'string' ? format : '0.0';
	    };
	
	    numbro.defaultCurrencyFormat = function (format) {
	        defaultCurrencyFormat = typeof format === 'string' ? format : '0$';
	    };
	
	    numbro.validate = function (val, culture) {
	
	        var _decimalSep, _thousandSep, _currSymbol, _valArray, _abbrObj, _thousandRegEx, cultureData, temp;
	
	        //coerce val to string
	        if (typeof val !== 'string') {
	            val += '';
	            if (console.warn) {
	                console.warn('Numbro.js: Value is not string. It has been co-erced to: ', val);
	            }
	        }
	
	        //trim whitespaces from either sides
	        val = val.trim();
	
	        //if val is just digits return true
	        if (!!val.match(/^\d+$/)) {
	            return true;
	        }
	
	        //if val is empty return false
	        if (val === '') {
	            return false;
	        }
	
	        //get the decimal and thousands separator from numbro.cultureData
	        try {
	            //check if the culture is understood by numbro. if not, default it to current culture
	            cultureData = numbro.cultureData(culture);
	        } catch (e) {
	            cultureData = numbro.cultureData(numbro.culture());
	        }
	
	        //setup the delimiters and currency symbol based on culture
	        _currSymbol = cultureData.currency.symbol;
	        _abbrObj = cultureData.abbreviations;
	        _decimalSep = cultureData.delimiters.decimal;
	        if (cultureData.delimiters.thousands === '.') {
	            _thousandSep = '\\.';
	        } else {
	            _thousandSep = cultureData.delimiters.thousands;
	        }
	
	        // validating currency symbol
	        temp = val.match(/^[^\d]+/);
	        if (temp !== null) {
	            val = val.substr(1);
	            if (temp[0] !== _currSymbol) {
	                return false;
	            }
	        }
	
	        //validating abbreviation symbol
	        temp = val.match(/[^\d]+$/);
	        if (temp !== null) {
	            val = val.slice(0, -1);
	            if (temp[0] !== _abbrObj.thousand && temp[0] !== _abbrObj.million && temp[0] !== _abbrObj.billion && temp[0] !== _abbrObj.trillion) {
	                return false;
	            }
	        }
	
	        _thousandRegEx = new RegExp(_thousandSep + '{2}');
	
	        if (!val.match(/[^\d.,]/g)) {
	            _valArray = val.split(_decimalSep);
	            if (_valArray.length > 2) {
	                return false;
	            } else {
	                if (_valArray.length < 2) {
	                    return !!_valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx);
	                } else {
	                    if (_valArray[0].length === 1) {
	                        return !!_valArray[0].match(/^\d+$/) && !_valArray[0].match(_thousandRegEx) && !!_valArray[1].match(/^\d+$/);
	                    } else {
	                        return !!_valArray[0].match(/^\d+.*\d$/) && !_valArray[0].match(_thousandRegEx) && !!_valArray[1].match(/^\d+$/);
	                    }
	                }
	            }
	        }
	
	        return false;
	    };
	
	    /**
	     * * @deprecated Since in version 1.6.0. It will be deleted in version 2.0
	     * `loadCulturesInNode` should be used instead.
	     */
	    numbro.loadLanguagesInNode = function () {
	        console.warn('`loadLanguagesInNode` is deprecated since version 1.6.0. Use `loadCulturesInNode` instead');
	
	        numbro.loadCulturesInNode();
	    };
	
	    numbro.loadCulturesInNode = function () {
	        // TODO: Rename the folder in 2.0.0
	        var cultures = __webpack_require__(4);
	
	        for (var langLocaleCode in cultures) {
	            if (langLocaleCode) {
	                numbro.culture(langLocaleCode, cultures[langLocaleCode]);
	            }
	        }
	    };
	
	    /************************************
	        Helpers
	    ************************************/
	
	    function setCulture(code, values) {
	        cultures[code] = values;
	    }
	
	    function chooseCulture(code) {
	        currentCulture = code;
	        var defaults = cultures[code].defaults;
	        if (defaults && defaults.format) {
	            numbro.defaultFormat(defaults.format);
	        }
	        if (defaults && defaults.currencyFormat) {
	            numbro.defaultCurrencyFormat(defaults.currencyFormat);
	        }
	    }
	
	    function inNodejsRuntime() {
	        return typeof process !== 'undefined' && process.browser === undefined && (process.title === 'node' || process.title === 'grunt' || process.title === 'gulp') && "function" !== 'undefined';
	    }
	
	    /************************************
	        Floating-point helpers
	    ************************************/
	
	    // The floating-point helper functions and implementation
	    // borrows heavily from sinful.js: http://guipn.github.io/sinful.js/
	
	    /**
	     * Array.prototype.reduce for browsers that don't support it
	     * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce#Compatibility
	     */
	    if ('function' !== typeof Array.prototype.reduce) {
	        Array.prototype.reduce = function (callback, optInitialValue) {
	
	            if (null === this || 'undefined' === typeof this) {
	                // At the moment all modern browsers, that support strict mode, have
	                // native implementation of Array.prototype.reduce. For instance, IE8
	                // does not support strict mode, so this check is actually useless.
	                throw new TypeError('Array.prototype.reduce called on null or undefined');
	            }
	
	            if ('function' !== typeof callback) {
	                throw new TypeError(callback + ' is not a function');
	            }
	
	            var index,
	                value,
	                length = this.length >>> 0,
	                isValueSet = false;
	
	            if (1 < arguments.length) {
	                value = optInitialValue;
	                isValueSet = true;
	            }
	
	            for (index = 0; length > index; ++index) {
	                if (this.hasOwnProperty(index)) {
	                    if (isValueSet) {
	                        value = callback(value, this[index], index, this);
	                    } else {
	                        value = this[index];
	                        isValueSet = true;
	                    }
	                }
	            }
	
	            if (!isValueSet) {
	                throw new TypeError('Reduce of empty array with no initial value');
	            }
	
	            return value;
	        };
	    }
	
	    /**
	     * Computes the multiplier necessary to make x >= 1,
	     * effectively eliminating miscalculations caused by
	     * finite precision.
	     */
	    function multiplier(x) {
	        var parts = x.toString().split('.');
	        if (parts.length < 2) {
	            return 1;
	        }
	        return Math.pow(10, parts[1].length);
	    }
	
	    /**
	     * Given a variable number of arguments, returns the maximum
	     * multiplier that must be used to normalize an operation involving
	     * all of them.
	     */
	    function correctionFactor() {
	        var args = Array.prototype.slice.call(arguments);
	        return args.reduce(function (prev, next) {
	            var mp = multiplier(prev),
	                mn = multiplier(next);
	            return mp > mn ? mp : mn;
	        }, -Infinity);
	    }
	
	    /************************************
	        Numbro Prototype
	    ************************************/
	
	    numbro.fn = Numbro.prototype = {
	
	        clone: function clone() {
	            return numbro(this);
	        },
	
	        format: function format(inputString, roundingFunction) {
	            return formatNumbro(this, inputString ? inputString : defaultFormat, roundingFunction !== undefined ? roundingFunction : Math.round);
	        },
	
	        formatCurrency: function formatCurrency(inputString, roundingFunction) {
	            return _formatCurrency(this, inputString ? inputString : defaultCurrencyFormat, roundingFunction !== undefined ? roundingFunction : Math.round);
	        },
	
	        unformat: function unformat(inputString) {
	            if (Object.prototype.toString.call(inputString) === '[object Number]') {
	                return inputString;
	            }
	            return unformatNumbro(this, inputString ? inputString : defaultFormat);
	        },
	
	        value: function value() {
	            return this._value;
	        },
	
	        valueOf: function valueOf() {
	            return this._value;
	        },
	
	        set: function set(value) {
	            this._value = Number(value);
	            return this;
	        },
	
	        add: function add(value) {
	            var corrFactor = correctionFactor.call(null, this._value, value);
	
	            function cback(accum, curr) {
	                return accum + corrFactor * curr;
	            }
	            this._value = [this._value, value].reduce(cback, 0) / corrFactor;
	            return this;
	        },
	
	        subtract: function subtract(value) {
	            var corrFactor = correctionFactor.call(null, this._value, value);
	
	            function cback(accum, curr) {
	                return accum - corrFactor * curr;
	            }
	            this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;
	            return this;
	        },
	
	        multiply: function multiply(value) {
	            function cback(accum, curr) {
	                var corrFactor = correctionFactor(accum, curr),
	                    result = accum * corrFactor;
	                result *= curr * corrFactor;
	                result /= corrFactor * corrFactor;
	                return result;
	            }
	            this._value = [this._value, value].reduce(cback, 1);
	            return this;
	        },
	
	        divide: function divide(value) {
	            function cback(accum, curr) {
	                var corrFactor = correctionFactor(accum, curr);
	                return accum * corrFactor / (curr * corrFactor);
	            }
	            this._value = [this._value, value].reduce(cback);
	            return this;
	        },
	
	        difference: function difference(value) {
	            return Math.abs(numbro(this._value).subtract(value).value());
	        }
	
	    };
	
	    /************************************
	        Exposing Numbro
	    ************************************/
	
	    if (inNodejsRuntime()) {
	        //Todo: Rename the folder in 2.0.0
	        numbro.loadCulturesInNode();
	    }
	
	    // CommonJS module is defined
	    if (hasModule) {
	        module.exports = numbro;
	    } else {
	        /*global ender:false */
	        if (typeof ender === 'undefined') {
	            // here, `this` means `window` in the browser, or `global` on the server
	            // add `numbro` as a global object via a string identifier,
	            // for Closure Compiler 'advanced' mode
	            this.numbro = numbro;
	        }
	
	        /*global define:false */
	        if (true) {
	            !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	                return numbro;
	            }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	        }
	    }
	}).call(typeof window === 'undefined' ? undefined : window);
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(3)))

/***/ },
/* 3 */
/***/ function(module, exports) {

	// shim for using process in browser
	
	'use strict';
	
	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;
	
	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}
	
	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;
	
	    var len = queue.length;
	    while (len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}
	
	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};
	
	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};
	
	function noop() {}
	
	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;
	
	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};
	
	process.cwd = function () {
	    return '/';
	};
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function () {
	    return 0;
	};

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	exports['cs-CZ'] = __webpack_require__(5);
	exports['da-DK'] = __webpack_require__(6);
	exports['de-CH'] = __webpack_require__(7);
	exports['de-DE'] = __webpack_require__(8);
	exports['en-GB'] = __webpack_require__(9);
	exports['en-ZA'] = __webpack_require__(10);
	exports['es-AR'] = __webpack_require__(11);
	exports['es-ES'] = __webpack_require__(12);
	exports['et-EE'] = __webpack_require__(13);
	exports['fa-IR'] = __webpack_require__(14);
	exports['fi-FI'] = __webpack_require__(15);
	exports['fil-PH'] = __webpack_require__(16);
	exports['fr-CA'] = __webpack_require__(17);
	exports['fr-CH'] = __webpack_require__(18);
	exports['fr-FR'] = __webpack_require__(19);
	exports['he-IL'] = __webpack_require__(20);
	exports['hu-HU'] = __webpack_require__(21);
	exports['it-IT'] = __webpack_require__(22);
	exports['ja-JP'] = __webpack_require__(23);
	exports['ko-KR'] = __webpack_require__(24);
	exports['lv-LV'] = __webpack_require__(25);
	exports['nb-NO'] = __webpack_require__(26);
	exports['nl-BE'] = __webpack_require__(27);
	exports['nl-NL'] = __webpack_require__(28);
	exports['pl-PL'] = __webpack_require__(29);
	exports['pt-BR'] = __webpack_require__(30);
	exports['pt-PT'] = __webpack_require__(31);
	exports['ru-RU'] = __webpack_require__(32);
	exports['ru-UA'] = __webpack_require__(33);
	exports['sk-SK'] = __webpack_require__(34);
	exports['sv-SE'] = __webpack_require__(35);
	exports['th-TH'] = __webpack_require__(36);
	exports['tr-TR'] = __webpack_require__(37);
	exports['uk-UA'] = __webpack_require__(38);
	exports['zh-CN'] = __webpack_require__(39);
	exports['zh-TW'] = __webpack_require__(40);

/***/ },
/* 5 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Czech
	 * locale: Czech Republic
	 * author : Anatoli Papirovski : https://github.com/apapirovski
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'cs-CZ',
	        cultureCode: 'cs-CZ',
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'tis.',
	            million: 'mil.',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function ordinal() {
	            return '.';
	        },
	        currency: {
	            symbol: 'Kč',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 6 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Danish
	 * locale: Denmark
	 * author : Michael Storgaard : https://github.com/mstorgaard
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'da-DK',
	        cultureCode: 'da-DK',
	        delimiters: {
	            thousands: '.',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'mio',
	            billion: 'mia',
	            trillion: 'b'
	        },
	        ordinal: function ordinal() {
	            return '.';
	        },
	        currency: {
	            symbol: 'kr',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 7 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : German
	 * locale: Switzerland
	 * author : Michael Piefel : https://github.com/piefel (based on work from Marco Krage : https://github.com/sinky)
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'de-CH',
	        cultureCode: 'de-CH',
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function ordinal() {
	            return '.';
	        },
	        currency: {
	            symbol: 'CHF',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 8 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : German
	 * locale: Germany
	 * author : Marco Krage : https://github.com/sinky
	 *
	 * Generally useful in Germany, Austria, Luxembourg, Belgium
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'de-DE',
	        cultureCode: 'de-DE',
	        delimiters: {
	            thousands: '.',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function ordinal() {
	            return '.';
	        },
	        currency: {
	            symbol: '€',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 9 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : English
	 * locale: United Kingdom of Great Britain and Northern Ireland
	 * author : Dan Ristic : https://github.com/dristic
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'en-GB',
	        cultureCode: 'en-GB',
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function ordinal(number) {
	            var b = number % 10;
	            return ~ ~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
	        },
	        currency: {
	            symbol: '£',
	            position: 'prefix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: '$ ,0.00',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: '$ ,0'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 10 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : English
	 * locale: South Africa
	 * author : Stewart Scott https://github.com/stewart42
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'en-ZA',
	        cultureCode: 'en-ZA',
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function ordinal(number) {
	            var b = number % 10;
	            return ~ ~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
	        },
	        currency: {
	            symbol: 'R',
	            position: 'prefix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: '$ ,0.00',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: '$ ,0'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 11 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Spanish
	 * locale: Argentina
	 * author : Hernan Garcia : https://github.com/hgarcia
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'es-AR',
	        cultureCode: 'es-AR',
	        delimiters: {
	            thousands: '.',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'mm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function ordinal(number) {
	            var b = number % 10;
	            return b === 1 || b === 3 ? 'er' : b === 2 ? 'do' : b === 7 || b === 0 ? 'mo' : b === 8 ? 'vo' : b === 9 ? 'no' : 'to';
	        },
	        currency: {
	            symbol: '$',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 12 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Spanish
	 * locale: Spain
	 * author : Hernan Garcia : https://github.com/hgarcia
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'es-ES',
	        cultureCode: 'es-ES',
	        delimiters: {
	            thousands: '.',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'mm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function ordinal(number) {
	            var b = number % 10;
	            return b === 1 || b === 3 ? 'er' : b === 2 ? 'do' : b === 7 || b === 0 ? 'mo' : b === 8 ? 'vo' : b === 9 ? 'no' : 'to';
	        },
	        currency: {
	            symbol: '€',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 13 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Estonian
	 * locale: Estonia
	 * author : Illimar Tambek : https://github.com/ragulka
	 *
	 * Note: in Estonian, abbreviations are always separated
	 * from numbers with a space
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'et-EE',
	        cultureCode: 'et-EE',
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: ' tuh',
	            million: ' mln',
	            billion: ' mld',
	            trillion: ' trl'
	        },
	        ordinal: function ordinal() {
	            return '.';
	        },
	        currency: {
	            symbol: '€',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 14 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Farsi
	 * locale: Iran
	 * author : neo13 : https://github.com/neo13
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'fa-IR',
	        cultureCode: 'fa-IR',
	        delimiters: {
	            thousands: '،',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: 'هزار',
	            million: 'میلیون',
	            billion: 'میلیارد',
	            trillion: 'تریلیون'
	        },
	        ordinal: function ordinal() {
	            return 'ام';
	        },
	        currency: {
	            symbol: '﷼'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 15 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Finnish
	 * locale: Finland
	 * author : Sami Saada : https://github.com/samitheberber
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'fi-FI',
	        cultureCode: 'fi-FI',
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'M',
	            billion: 'G',
	            trillion: 'T'
	        },
	        ordinal: function ordinal() {
	            return '.';
	        },
	        currency: {
	            symbol: '€',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 16 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Filipino (Pilipino)
	 * locale: Philippines
	 * author : Michael Abadilla : https://github.com/mjmaix
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'fil-PH',
	        cultureCode: 'fil-PH',
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function ordinal(number) {
	            var b = number % 10;
	            return ~ ~(number % 100 / 10) === 1 ? 'th' : b === 1 ? 'st' : b === 2 ? 'nd' : b === 3 ? 'rd' : 'th';
	        },
	        currency: {
	            symbol: '₱'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 17 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : French
	 * locale: Canada
	 * author : Léo Renaud-Allaire : https://github.com/renaudleo
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'fr-CA',
	        cultureCode: 'fr-CA',
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'M',
	            billion: 'G',
	            trillion: 'T'
	        },
	        ordinal: function ordinal(number) {
	            return number === 1 ? 'er' : 'ème';
	        },
	        currency: {
	            symbol: '$',
	            position: 'prefix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: '$ ,0.00',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: '$ ,0'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 18 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : French
	 * locale: Switzerland
	 * author : Adam Draper : https://github.com/adamwdraper
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'fr-CH',
	        cultureCode: 'fr-CH',
	        delimiters: {
	            thousands: '\'',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function ordinal(number) {
	            return number === 1 ? 'er' : 'ème';
	        },
	        currency: {
	            symbol: 'CHF',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 19 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : French
	 * locale: France
	 * author : Adam Draper : https://github.com/adamwdraper
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'fr-FR',
	        cultureCode: 'fr-FR',
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function ordinal(number) {
	            return number === 1 ? 'er' : 'ème';
	        },
	        currency: {
	            symbol: '€',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 20 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Hebrew
	 * locale : IL
	 * author : Eli Zehavi : https://github.com/eli-zehavi
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'he-IL',
	        cultureCode: 'he-IL',
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: 'אלף',
	            million: 'מליון',
	            billion: 'בליון',
	            trillion: 'טריליון'
	        },
	        currency: {
	            symbol: '₪',
	            position: 'prefix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: '₪ ,0.00',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: '₪ ,0'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 21 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Hungarian
	 * locale: Hungary
	 * author : Peter Bakondy : https://github.com/pbakondy
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'hu-HU',
	        cultureCode: 'hu-HU',
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'E', // ezer
	            million: 'M', // millió
	            billion: 'Mrd', // milliárd
	            trillion: 'T' // trillió
	        },
	        ordinal: function ordinal() {
	            return '.';
	        },
	        currency: {
	            symbol: ' Ft',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 22 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Italian
	 * locale: Italy
	 * author : Giacomo Trombi : http://cinquepunti.it
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'it-IT',
	        cultureCode: 'it-IT',
	        delimiters: {
	            thousands: '.',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'mila',
	            million: 'mil',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function ordinal() {
	            return 'º';
	        },
	        currency: {
	            symbol: '€',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 23 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Japanese
	 * locale: Japan
	 * author : teppeis : https://github.com/teppeis
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'ja-JP',
	        cultureCode: 'ja-JP',
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: '千',
	            million: '百万',
	            billion: '十億',
	            trillion: '兆'
	        },
	        ordinal: function ordinal() {
	            return '.';
	        },
	        currency: {
	            symbol: '¥',
	            position: 'prefix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: '$ ,0.00',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: '$ ,0'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 24 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Korean
	 * author (numbro.js Version): Randy Wilander : https://github.com/rocketedaway
	 * author (numeral.js Version) : Rich Daley : https://github.com/pedantic-git
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'ko-KR',
	        cultureCode: 'ko-KR',
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: '천',
	            million: '백만',
	            billion: '십억',
	            trillion: '일조'
	        },
	        ordinal: function ordinal() {
	            return '.';
	        },
	        currency: {
	            symbol: '₩'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 25 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Latvian
	 * locale: Latvia
	 * author : Lauris Bukšis-Haberkorns : https://github.com/Lafriks
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'lv-LV',
	        cultureCode: 'lv-LV',
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: ' tūkst.',
	            million: ' milj.',
	            billion: ' mljrd.',
	            trillion: ' trilj.'
	        },
	        ordinal: function ordinal() {
	            return '.';
	        },
	        currency: {
	            symbol: '€',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 26 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language: Norwegian Bokmål
	 * locale: Norway
	 * author : Benjamin Van Ryseghem
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'nb-NO',
	        cultureCode: 'nb-NO',
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 't',
	            million: 'M',
	            billion: 'md',
	            trillion: 't'
	        },
	        currency: {
	            symbol: 'kr',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 27 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Dutch
	 * locale: Belgium
	 * author : Dieter Luypaert : https://github.com/moeriki
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'nl-BE',
	        cultureCode: 'nl-BE',
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'mln',
	            billion: 'mld',
	            trillion: 'bln'
	        },
	        ordinal: function ordinal(number) {
	            var remainder = number % 100;
	            return number !== 0 && remainder <= 1 || remainder === 8 || remainder >= 20 ? 'ste' : 'de';
	        },
	        currency: {
	            symbol: '€',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 28 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Dutch
	 * locale: Netherlands
	 * author : Dave Clayton : https://github.com/davedx
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'nl-NL',
	        cultureCode: 'nl-NL',
	        delimiters: {
	            thousands: '.',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'mln',
	            billion: 'mrd',
	            trillion: 'bln'
	        },
	        ordinal: function ordinal(number) {
	            var remainder = number % 100;
	            return number !== 0 && remainder <= 1 || remainder === 8 || remainder >= 20 ? 'ste' : 'de';
	        },
	        currency: {
	            symbol: '€',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 29 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Polish
	 * locale : Poland
	 * author : Dominik Bulaj : https://github.com/dominikbulaj
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'pl-PL',
	        cultureCode: 'pl-PL',
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'tys.',
	            million: 'mln',
	            billion: 'mld',
	            trillion: 'bln'
	        },
	        ordinal: function ordinal() {
	            return '.';
	        },
	        currency: {
	            symbol: ' zł',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 30 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Portuguese
	 * locale : Brazil
	 * author : Ramiro Varandas Jr : https://github.com/ramirovjr
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'pt-BR',
	        cultureCode: 'pt-BR',
	        delimiters: {
	            thousands: '.',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'mil',
	            million: 'milhões',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function ordinal() {
	            return 'º';
	        },
	        currency: {
	            symbol: 'R$',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 31 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Portuguese
	 * locale : Portugal
	 * author : Diogo Resende : https://github.com/dresende
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'pt-PT',
	        cultureCode: 'pt-PT',
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'k',
	            million: 'm',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function ordinal() {
	            return 'º';
	        },
	        currency: {
	            symbol: '€',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 32 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Russian
	 * locale : Russsia
	 * author : Anatoli Papirovski : https://github.com/apapirovski
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'ru-RU',
	        cultureCode: 'ru-RU',
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'тыс.',
	            million: 'млн',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function ordinal() {
	            // not ideal, but since in Russian it can taken on
	            // different forms (masculine, feminine, neuter)
	            // this is all we can do
	            return '.';
	        },
	        currency: {
	            symbol: 'руб.',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 33 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Russian
	 * locale : Ukraine
	 * author : Anatoli Papirovski : https://github.com/apapirovski
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'ru-UA',
	        cultureCode: 'ru-UA',
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'тыс.',
	            million: 'млн',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function ordinal() {
	            // not ideal, but since in Russian it can taken on
	            // different forms (masculine, feminine, neuter)
	            // this is all we can do
	            return '.';
	        },
	        currency: {
	            symbol: '₴',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 34 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Slovak
	 * locale : Slovakia
	 * author : Ahmed Al Hafoudh : http://www.freevision.sk
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'sk-SK',
	        cultureCode: 'sk-SK',
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'tis.',
	            million: 'mil.',
	            billion: 'b',
	            trillion: 't'
	        },
	        ordinal: function ordinal() {
	            return '.';
	        },
	        currency: {
	            symbol: '€',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 35 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Swedish
	 * locale : Sweden
	 * author : Benjamin Van Ryseghem (benjamin.vanryseghem.com)
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'sv-SE',
	        cultureCode: 'sv-SE',
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 't',
	            million: 'M',
	            billion: 'md',
	            trillion: 'tmd'
	        },
	        currency: {
	            symbol: 'kr',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 36 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Thai
	 * locale : Thailand
	 * author : Sathit Jittanupat : https://github.com/jojosati
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'th-TH',
	        cultureCode: 'th-TH',
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: 'พัน',
	            million: 'ล้าน',
	            billion: 'พันล้าน',
	            trillion: 'ล้านล้าน'
	        },
	        ordinal: function ordinal() {
	            return '.';
	        },
	        currency: {
	            symbol: '฿',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 37 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Turkish
	 * locale : Turkey
	 * author : Ecmel Ercan : https://github.com/ecmel,
	 *          Erhan Gundogan : https://github.com/erhangundogan,
	 *          Burak Yiğit Kaya: https://github.com/BYK
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var suffixes = {
	        1: '\'inci',
	        5: '\'inci',
	        8: '\'inci',
	        70: '\'inci',
	        80: '\'inci',
	
	        2: '\'nci',
	        7: '\'nci',
	        20: '\'nci',
	        50: '\'nci',
	
	        3: '\'üncü',
	        4: '\'üncü',
	        100: '\'üncü',
	
	        6: '\'ncı',
	
	        9: '\'uncu',
	        10: '\'uncu',
	        30: '\'uncu',
	
	        60: '\'ıncı',
	        90: '\'ıncı'
	    },
	        language = {
	        langLocaleCode: 'tr-TR',
	        cultureCode: 'tr-TR',
	        delimiters: {
	            thousands: '.',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'bin',
	            million: 'milyon',
	            billion: 'milyar',
	            trillion: 'trilyon'
	        },
	        ordinal: function ordinal(number) {
	            if (number === 0) {
	                // special case for zero
	                return '\'ıncı';
	            }
	
	            var a = number % 10,
	                b = number % 100 - a,
	                c = number >= 100 ? 100 : null;
	
	            return suffixes[a] || suffixes[b] || suffixes[c];
	        },
	        currency: {
	            symbol: '₺',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 38 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Ukrainian
	 * locale : Ukraine
	 * author : Michael Piefel : https://github.com/piefel (with help from Tetyana Kuzmenko)
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'uk-UA',
	        cultureCode: 'uk-UA',
	        delimiters: {
	            thousands: ' ',
	            decimal: ','
	        },
	        abbreviations: {
	            thousand: 'тис.',
	            million: 'млн',
	            billion: 'млрд',
	            trillion: 'блн'
	        },
	        ordinal: function ordinal() {
	            // not ideal, but since in Ukrainian it can taken on
	            // different forms (masculine, feminine, neuter)
	            // this is all we can do
	            return '';
	        },
	        currency: {
	            symbol: '₴',
	            position: 'postfix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: ',0.00 $',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: ',0 $'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 39 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : simplified chinese
	 * locale : China
	 * author : badplum : https://github.com/badplum
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'zh-CN',
	        cultureCode: 'zh-CN',
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: '千',
	            million: '百万',
	            billion: '十亿',
	            trillion: '兆'
	        },
	        ordinal: function ordinal() {
	            return '.';
	        },
	        currency: {
	            symbol: '¥',
	            position: 'prefix'
	        },
	        defaults: {
	            currencyFormat: ',4 a'
	        },
	        formats: {
	            fourDigits: '4 a',
	            fullWithTwoDecimals: '$ ,0.00',
	            fullWithTwoDecimalsNoCurrency: ',0.00',
	            fullWithNoDecimals: '$ ,0'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 40 */
/***/ function(module, exports) {

	/*!
	 * numbro.js language configuration
	 * language : Chinese (Taiwan)
	 * author (numbro.js Version): Randy Wilander : https://github.com/rocketedaway
	 * author (numeral.js Version) : Rich Daley : https://github.com/pedantic-git
	 */
	'use strict';
	
	(function () {
	    'use strict';
	
	    var language = {
	        langLocaleCode: 'zh-TW',
	        cultureCode: 'zh-TW',
	        delimiters: {
	            thousands: ',',
	            decimal: '.'
	        },
	        abbreviations: {
	            thousand: '千',
	            million: '百萬',
	            billion: '十億',
	            trillion: '兆'
	        },
	        ordinal: function ordinal() {
	            return '第';
	        },
	        currency: {
	            symbol: 'NT$'
	        }
	    };
	
	    // CommonJS
	    if (typeof module !== 'undefined' && module.exports) {
	        module.exports = language;
	    }
	    // Browser
	    if (typeof window !== 'undefined' && window.numbro && window.numbro.culture) {
	        window.numbro.culture(language.cultureCode, language);
	    }
	}).call(typeof window === 'undefined' ? undefined : window);

/***/ },
/* 41 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_41__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-number-input.map