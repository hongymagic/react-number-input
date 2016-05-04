//
// NumberInput formats numbers to comma-separated values after
// user loses focus of the input.
//
// Current dependencies are:
//   React@0.14-beta3, numeral.js
//
// Requires ES5 shim/sham in older browsers.
//

import assign from 'object-assign'
import numeral from 'numeral'
import { Component, PropTypes, createElement } from 'react'

const DEFAULT_NUMBER_FORMAT = '0,0[.][00]'

/**
 * Check if a given value is a valid number.
 *
 * @param   {any}
 * @returns {bool} True if given value is a valid number.
 */
export function isNumber(value) {
	return typeof value === 'number' && isFinite(value) && !isNaN(value)
}

/**
 * Safe conversion to numeral object. Numeral crashes with the value is
 * object or function.
 *
 * @param   {any}
 * @returns {numeral}
 */
export function toNumeral(value) {
	const type = typeof value

	if (type === 'object' || type === 'function' || type === 'boolean') {
		return null
	}

	const n = numeral(value)

	// numeral.js converts empty strings into 0 for no reason, so if given
	// value was not '0' or 0, treat it as null.
	if (n.value() === 0 && (value !== 0 && value !== '0')) {
		return null
	}

	// numeral.js can sometimes convert values (like '4.5.2') into NaN
	// and we would rather null than NaN.
	if (isNaN(n.value())) {
		return null
	}

	return n
}

/**
 * Convert given value to a number type. If conversion fails, returns NaN.
 *
 * @param   {any}
 * @returns {Number} NaN if conversion fails.
 */
export function parseNumber(value) {
	const n = toNumeral(value)
	return n ? n.value() : NaN
}

/**
 * Apply number formatting to given number value. If given value cannot be
 * converted to a number, returns null.
 *
 * @param   {any}
 * @returns {string}
 */
export function formatNumber(value, format = DEFAULT_NUMBER_FORMAT) {
	const n = toNumeral(value)
	return n ? n.format(format) : null
}

/**
 * <NumberInput /> component
 *
 * @param   {Number} value
 * @returns {Component}
 */
export default class NumberInput extends Component {
	constructor(props) {
		super(props)

		const value = parseNumber(this.props.value)

		// focused: keep track of the input's focus state
		// numeral: keep track of the input's current value (numeral object)
		this.state = {
			focused: false,
			value: isNumber(value) ? value : ''
		}

		this.onChange = this.onChange.bind(this)
		this.onFocus = this.onFocus.bind(this)
		this.onBlur = this.onBlur.bind(this)
	}

	componentWillReceiveProps(props) {
		// Prevent changing the value via external entry when editing.
		if (!this.state.focused && 'value' in props) {
			const value = parseNumber(props.value)
			this.setState({ value: isNumber(value) ? value : '' })
		}
	}

	componentDidMount() {
		// focused: check if component is focused after mounting and set state
		this.setState({
			focused: global.document.activeElement === this.refs.input
		})
	}

	onChange(event) {
		event.persist()
		this.setState(
			{ value: event.target.value },
			() => this.props.onChange(event)
		)
	}

	onBlur(event) {
		event.persist()
		let n = toNumeral(event.target.value)

		// If given value is lower than minimum, set the value to minimum
		if (n && 'min' in this.props && n.value() < this.props.min) {
			n = toNumeral(this.props.min)
		}

		// If given value is greater than maximum, set the value to maximum
		if (n && 'max' in this.props && n.value() > this.props.max) {
			n = toNumeral(this.props.max)
		}

		// Set the event target value to corrected value
		event.target.value = n ? n.value() : ''

		this.setState(
			{
				focused: false,
				value: n ? n.format(this.props.format) : ''
			},
			() => this.props.onBlur(event)
		)
	}

	onFocus(event) {
		event.persist()
		const n = toNumeral(event.target.value)
		this.setState(
			{
				focused: true,
				value: n ? n.value() : ''
			},
			() => this.props.onFocus(event)
		)
	}

	valueAsFormatted() {
		const value = this.state.value
		const n = toNumeral(value)

		return n ? n.format(this.props.format) : ''
	}

	render() {
		const value = this.state.focused ? this.state.value : this.valueAsFormatted()
		return createElement(
			'input',
			assign(
				{},
				this.props,
				{
					ref: 'input',
					onChange: this.onChange,
					onFocus: this.onFocus,
					onBlur: this.onBlur,
					value: value
				}
			)
		)
	}
}

NumberInput.propTypes = {
	value: PropTypes.number,
	type: PropTypes.string,
	format: PropTypes.string,
	min: PropTypes.number,
	max: PropTypes.number,
	onFocus: PropTypes.func,
	onBlur: PropTypes.func,
	onChange: PropTypes.func
}

NumberInput.defaultProps = {
	value: null,
	type: 'tel',
	format: DEFAULT_NUMBER_FORMAT,
	onFocus: () => {},
	onBlur: () => {},
	onChange: () => {}
}
