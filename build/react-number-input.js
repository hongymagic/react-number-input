(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("react"));
	else if(typeof define === 'function' && define.amd)
		define(["react"], factory);
	else if(typeof exports === 'object')
		exports["ReactNumberInput"] = factory(require("react"));
	else
		root["ReactNumberInput"] = factory(root["React"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
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
	//   React@0.14-beta3, numeral.js
	//
	// Requires ES5 shim/sham in older browsers.
	//
	
	'use strict';
	
	Object.defineProperty(exports, '__esModule', {
		value: true
	});
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ('value' in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(_x2, _x3, _x4) { var _again = true; _function: while (_again) { var object = _x2, property = _x3, receiver = _x4; desc = parent = getter = undefined; _again = false; if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { _x2 = parent; _x3 = property; _x4 = receiver; _again = true; continue _function; } } else if ('value' in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } } };
	
	exports.isNumber = isNumber;
	exports.toNumeral = toNumeral;
	exports.parseNumber = parseNumber;
	exports.formatNumber = formatNumber;
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var _objectAssign = __webpack_require__(1);
	
	var _objectAssign2 = _interopRequireDefault(_objectAssign);
	
	var _numeral = __webpack_require__(2);
	
	var _numeral2 = _interopRequireDefault(_numeral);
	
	var _react = __webpack_require__(3);
	
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
	
		var n = (0, _numeral2['default'])(value);
	
		// numeral.js converts empty strings into 0 for no reason, so if given
		// value was not '0' or 0, treat it as null.
		if (n.value() === 0 && (value !== 0 || value !== '0')) {
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
		value: _react.PropTypes.number.isRequired,
		type: _react.PropTypes.string,
		format: _react.PropTypes.string,
		min: _react.PropTypes.number,
		max: _react.PropTypes.number
	};
	
	NumberInput.defaultProps = {
		value: null,
		type: 'tel',
		format: DEFAULT_NUMBER_FORMAT,
		onFocus: function onFocus() {},
		onBlur: function onBlur() {},
		onChange: function onChange() {}
	};
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 1 */
/***/ function(module, exports) {

	/* eslint-disable no-unused-vars */
	'use strict';
	var hasOwnProperty = Object.prototype.hasOwnProperty;
	var propIsEnumerable = Object.prototype.propertyIsEnumerable;
	
	function toObject(val) {
		if (val === null || val === undefined) {
			throw new TypeError('Object.assign cannot be called with null or undefined');
		}
	
		return Object(val);
	}
	
	module.exports = Object.assign || function (target, source) {
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

	var __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;/*!
	 * numeral.js
	 * version : 1.5.3
	 * author : Adam Draper
	 * license : MIT
	 * http://adamwdraper.github.com/Numeral-js/
	 */
	
	'use strict';
	
	(function () {
	
	    /************************************
	        Constants
	    ************************************/
	
	    var numeral,
	        VERSION = '1.5.3',
	
	    // internal storage for language config files
	    languages = {},
	        currentLanguage = 'en',
	        zeroFormat = null,
	        defaultFormat = '0,0',
	
	    // check for nodeJS
	    hasModule = typeof module !== 'undefined' && module.exports;
	
	    /************************************
	        Constructors
	    ************************************/
	
	    // Numeral prototype object
	    function Numeral(number) {
	        this._value = number;
	    }
	
	    /**
	     * Implementation of toFixed() that treats floats more like decimals
	     *
	     * Fixes binary rounding issues (eg. (0.615).toFixed(2) === '0.61') that present
	     * problems for accounting- and finance-related software.
	     */
	    function toFixed(value, precision, roundingFunction, optionals) {
	        var power = Math.pow(10, precision),
	            optionalsRegExp,
	            output;
	
	        //roundingFunction = (roundingFunction !== undefined ? roundingFunction : Math.round);
	        // Multiply up by precision, round accurately, then divide and use native toFixed():
	        output = (roundingFunction(value * power) / power).toFixed(precision);
	
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
	    function formatNumeral(n, format, roundingFunction) {
	        var output;
	
	        // figure out what kind of format we are dealing with
	        if (format.indexOf('$') > -1) {
	            // currency!!!!!
	            output = formatCurrency(n, format, roundingFunction);
	        } else if (format.indexOf('%') > -1) {
	            // percentage
	            output = formatPercentage(n, format, roundingFunction);
	        } else if (format.indexOf(':') > -1) {
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
	    function unformatNumeral(n, string) {
	        var stringOriginal = string,
	            thousandRegExp,
	            millionRegExp,
	            billionRegExp,
	            trillionRegExp,
	            suffixes = ['KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	            bytesMultiplier = false,
	            power;
	
	        if (string.indexOf(':') > -1) {
	            n._value = unformatTime(string);
	        } else {
	            if (string === zeroFormat) {
	                n._value = 0;
	            } else {
	                if (languages[currentLanguage].delimiters.decimal !== '.') {
	                    string = string.replace(/\./g, '').replace(languages[currentLanguage].delimiters.decimal, '.');
	                }
	
	                // see if abbreviations are there so that we can multiply to the correct number
	                thousandRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.thousand + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                millionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.million + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                billionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.billion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	                trillionRegExp = new RegExp('[^a-zA-Z]' + languages[currentLanguage].abbreviations.trillion + '(?:\\)|(\\' + languages[currentLanguage].currency.symbol + ')?(?:\\))?)?$');
	
	                // see if bytes are there so that we can multiply to the correct number
	                for (power = 0; power <= suffixes.length; power++) {
	                    bytesMultiplier = string.indexOf(suffixes[power]) > -1 ? Math.pow(1024, power + 1) : false;
	
	                    if (bytesMultiplier) {
	                        break;
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
	
	    function formatCurrency(n, format, roundingFunction) {
	        var symbolIndex = format.indexOf('$'),
	            openParenIndex = format.indexOf('('),
	            minusSignIndex = format.indexOf('-'),
	            space = '',
	            spliceIndex,
	            output;
	
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
	
	        // format the number
	        output = formatNumber(n._value, format, roundingFunction);
	
	        // position the symbol
	        if (symbolIndex <= 1) {
	            if (output.indexOf('(') > -1 || output.indexOf('-') > -1) {
	                output = output.split('');
	                spliceIndex = 1;
	                if (symbolIndex < openParenIndex || symbolIndex < minusSignIndex) {
	                    // the symbol appears before the "(" or "-"
	                    spliceIndex = 0;
	                }
	                output.splice(spliceIndex, 0, languages[currentLanguage].currency.symbol + space);
	                output = output.join('');
	            } else {
	                output = languages[currentLanguage].currency.symbol + space + output;
	            }
	        } else {
	            if (output.indexOf(')') > -1) {
	                output = output.split('');
	                output.splice(-1, 0, space + languages[currentLanguage].currency.symbol);
	                output = output.join('');
	            } else {
	                output = output + space + languages[currentLanguage].currency.symbol;
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
	
	    function formatNumber(value, format, roundingFunction) {
	        var negP = false,
	            signed = false,
	            optDec = false,
	            abbr = '',
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
	            suffixes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
	            min,
	            max,
	            power,
	            w,
	            precision,
	            thousands,
	            d = '',
	            neg = false;
	
	        // check if number is zero and a custom zero format has been set
	        if (value === 0 && zeroFormat !== null) {
	            return zeroFormat;
	        } else {
	            // see if we should use parentheses for negative number or if we should prefix with a sign
	            // if both are present we default to parentheses
	            if (format.indexOf('(') > -1) {
	                negP = true;
	                format = format.slice(1, -1);
	            } else if (format.indexOf('+') > -1) {
	                signed = true;
	                format = format.replace(/\+/g, '');
	            }
	
	            // see if abbreviation is wanted
	            if (format.indexOf('a') > -1) {
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
	
	                if (abs >= Math.pow(10, 12) && !abbrForce || abbrT) {
	                    // trillion
	                    abbr = abbr + languages[currentLanguage].abbreviations.trillion;
	                    value = value / Math.pow(10, 12);
	                } else if (abs < Math.pow(10, 12) && abs >= Math.pow(10, 9) && !abbrForce || abbrB) {
	                    // billion
	                    abbr = abbr + languages[currentLanguage].abbreviations.billion;
	                    value = value / Math.pow(10, 9);
	                } else if (abs < Math.pow(10, 9) && abs >= Math.pow(10, 6) && !abbrForce || abbrM) {
	                    // million
	                    abbr = abbr + languages[currentLanguage].abbreviations.million;
	                    value = value / Math.pow(10, 6);
	                } else if (abs < Math.pow(10, 6) && abs >= Math.pow(10, 3) && !abbrForce || abbrK) {
	                    // thousand
	                    abbr = abbr + languages[currentLanguage].abbreviations.thousand;
	                    value = value / Math.pow(10, 3);
	                }
	            }
	
	            // see if we are formatting bytes
	            if (format.indexOf('b') > -1) {
	                // check for space before
	                if (format.indexOf(' b') > -1) {
	                    bytes = ' ';
	                    format = format.replace(' b', '');
	                } else {
	                    format = format.replace('b', '');
	                }
	
	                for (power = 0; power <= suffixes.length; power++) {
	                    min = Math.pow(1024, power);
	                    max = Math.pow(1024, power + 1);
	
	                    if (value >= min && value < max) {
	                        bytes = bytes + suffixes[power];
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
	
	                ord = ord + languages[currentLanguage].ordinal(value);
	            }
	
	            if (format.indexOf('[.]') > -1) {
	                optDec = true;
	                format = format.replace('[.]', '.');
	            }
	
	            w = value.toString().split('.')[0];
	            precision = format.split('.')[1];
	            thousands = format.indexOf(',');
	
	            if (precision) {
	                if (precision.indexOf('[') > -1) {
	                    precision = precision.replace(']', '');
	                    precision = precision.split('[');
	                    d = toFixed(value, precision[0].length + precision[1].length, roundingFunction, precision[1].length);
	                } else {
	                    d = toFixed(value, precision.length, roundingFunction);
	                }
	
	                w = d.split('.')[0];
	
	                if (d.split('.')[1].length) {
	                    d = languages[currentLanguage].delimiters.decimal + d.split('.')[1];
	                } else {
	                    d = '';
	                }
	
	                if (optDec && Number(d.slice(1)) === 0) {
	                    d = '';
	                }
	            } else {
	                w = toFixed(value, null, roundingFunction);
	            }
	
	            // format number
	            if (w.indexOf('-') > -1) {
	                w = w.slice(1);
	                neg = true;
	            }
	
	            if (thousands > -1) {
	                w = w.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1' + languages[currentLanguage].delimiters.thousands);
	            }
	
	            if (format.indexOf('.') === 0) {
	                w = '';
	            }
	
	            return (negP && neg ? '(' : '') + (!negP && neg ? '-' : '') + (!neg && signed ? '+' : '') + w + d + (ord ? ord : '') + (abbr ? abbr : '') + (bytes ? bytes : '') + (negP && neg ? ')' : '');
	        }
	    }
	
	    /************************************
	        Top Level Functions
	    ************************************/
	
	    numeral = function (input) {
	        if (numeral.isNumeral(input)) {
	            input = input.value();
	        } else if (input === 0 || typeof input === 'undefined') {
	            input = 0;
	        } else if (!Number(input)) {
	            input = numeral.fn.unformat(input);
	        }
	
	        return new Numeral(Number(input));
	    };
	
	    // version number
	    numeral.version = VERSION;
	
	    // compare numeral object
	    numeral.isNumeral = function (obj) {
	        return obj instanceof Numeral;
	    };
	
	    // This function will load languages and then set the global language.  If
	    // no arguments are passed in, it will simply return the current global
	    // language key.
	    numeral.language = function (key, values) {
	        if (!key) {
	            return currentLanguage;
	        }
	
	        if (key && !values) {
	            if (!languages[key]) {
	                throw new Error('Unknown language : ' + key);
	            }
	            currentLanguage = key;
	        }
	
	        if (values || !languages[key]) {
	            loadLanguage(key, values);
	        }
	
	        return numeral;
	    };
	
	    // This function provides access to the loaded language data.  If
	    // no arguments are passed in, it will simply return the current
	    // global language object.
	    numeral.languageData = function (key) {
	        if (!key) {
	            return languages[currentLanguage];
	        }
	
	        if (!languages[key]) {
	            throw new Error('Unknown language : ' + key);
	        }
	
	        return languages[key];
	    };
	
	    numeral.language('en', {
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
	            symbol: '$'
	        }
	    });
	
	    numeral.zeroFormat = function (format) {
	        zeroFormat = typeof format === 'string' ? format : null;
	    };
	
	    numeral.defaultFormat = function (format) {
	        defaultFormat = typeof format === 'string' ? format : '0.0';
	    };
	
	    /************************************
	        Helpers
	    ************************************/
	
	    function loadLanguage(key, values) {
	        languages[key] = values;
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
	        Array.prototype.reduce = function (callback, opt_initialValue) {
	            'use strict';
	
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
	                value = opt_initialValue;
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
	        Numeral Prototype
	    ************************************/
	
	    numeral.fn = Numeral.prototype = {
	
	        clone: function clone() {
	            return numeral(this);
	        },
	
	        format: function format(inputString, roundingFunction) {
	            return formatNumeral(this, inputString ? inputString : defaultFormat, roundingFunction !== undefined ? roundingFunction : Math.round);
	        },
	
	        unformat: function unformat(inputString) {
	            if (Object.prototype.toString.call(inputString) === '[object Number]') {
	                return inputString;
	            }
	            return unformatNumeral(this, inputString ? inputString : defaultFormat);
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
	            function cback(accum, curr, currI, O) {
	                return accum + corrFactor * curr;
	            }
	            this._value = [this._value, value].reduce(cback, 0) / corrFactor;
	            return this;
	        },
	
	        subtract: function subtract(value) {
	            var corrFactor = correctionFactor.call(null, this._value, value);
	            function cback(accum, curr, currI, O) {
	                return accum - corrFactor * curr;
	            }
	            this._value = [value].reduce(cback, this._value * corrFactor) / corrFactor;
	            return this;
	        },
	
	        multiply: function multiply(value) {
	            function cback(accum, curr, currI, O) {
	                var corrFactor = correctionFactor(accum, curr);
	                return accum * corrFactor * (curr * corrFactor) / (corrFactor * corrFactor);
	            }
	            this._value = [this._value, value].reduce(cback, 1);
	            return this;
	        },
	
	        divide: function divide(value) {
	            function cback(accum, curr, currI, O) {
	                var corrFactor = correctionFactor(accum, curr);
	                return accum * corrFactor / (curr * corrFactor);
	            }
	            this._value = [this._value, value].reduce(cback);
	            return this;
	        },
	
	        difference: function difference(value) {
	            return Math.abs(numeral(this._value).subtract(value).value());
	        }
	
	    };
	
	    /************************************
	        Exposing Numeral
	    ************************************/
	
	    // CommonJS module is defined
	    if (hasModule) {
	        module.exports = numeral;
	    }
	
	    /*global ender:false */
	    if (typeof ender === 'undefined') {
	        // here, `this` means `window` in the browser, or `global` on the server
	        // add `numeral` as a global object via a string identifier,
	        // for Closure Compiler 'advanced' mode
	        this['numeral'] = numeral;
	    }
	
	    /*global define:false */
	    if (true) {
	        !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_RESULT__ = function () {
	            return numeral;
	        }.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__), __WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
	    }
	}).call(undefined);

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ }
/******/ ])
});
;
//# sourceMappingURL=react-number-input.map