import React from 'react'
import {findDOMNode} from 'react-dom'
import TestUtils from 'react-addons-test-utils'
import NumberInput, {parseNumber, formatNumber, isNumber} from '../src/react-number-input'

const Simulate = TestUtils.Simulate

describe('react-number-input', () => {
	describe('input#value', () => {
		const value = 900000
		let component
		let event

		beforeEach(() => {
			component = TestUtils.renderIntoDocument(
				<NumberInput
					value={value}
					onChange={() => {}}
				/>
			)

			event = {
				target: {
					value: '1000000'
				}
			}
		})

		afterEach(() => {
			component = null
			event = null
		})

		it('should set focused state to false on load', () => {
			expect(component.state.focused).toBe(false)
		})

		it('should display formatted value when rendered', () => {
			// Verify that number has been formatted
			expect(findDOMNode(component).value).toEqual('900,000')
		})

		it('should display un-formatted number when editing', () => {
			// Change the number
			Simulate.focus(findDOMNode(component))
			Simulate.change(findDOMNode(component), event)

			// Verify that number has been formatted
			expect(findDOMNode(component).value).toEqual('1000000')
		})

		it('should display un-formatted netgative number when editing', () => {
			event.target.value = '-900000'

			// Change the number
			Simulate.focus(findDOMNode(component))
			Simulate.change(findDOMNode(component), event)

			// Verify that number has been formatted
			expect(findDOMNode(component).value).toEqual('-900000')
		})

		it('should display zero when zero is entered! (duh)', () => {
			event.target.value = '0'

			// Change the number
			Simulate.change(findDOMNode(component), event)
			Simulate.blur(findDOMNode(component))

			// Verify that number has been formatted
			expect(findDOMNode(component).value).toEqual('0')
		})

		it('should display nothing when nothing is entered! (duh)', () => {
			event.target.value = ''

			// Change the number
			Simulate.change(findDOMNode(component), event)
			Simulate.blur(findDOMNode(component))

			// Verify that number has been formatted
			expect(findDOMNode(component).value).toEqual('')
		})

		it('should display formatted number when editing is complete', () => {
			// Change the number
			Simulate.change(findDOMNode(component), event)
			Simulate.blur(findDOMNode(component))

			// Verify that number has been formatted
			expect(findDOMNode(component).value).toEqual('1,000,000')
		})

		it('should display formatted negative number when editing is complete', () => {
			event.target.value = '-900000'

			// Change the number
			Simulate.change(findDOMNode(component), event)
			Simulate.blur(findDOMNode(component))

			// Verify that number has been formatted
			expect(findDOMNode(component).value).toEqual('-900,000')
		})
	})

	describe('onChange', () => {
		const value = 900000
		let called = false
		let component
		let event
		let parcel

		beforeEach(() => {
			component = TestUtils.renderIntoDocument(
				<NumberInput
					id="test"
					value={value}
					onChange={(e) => {
						called = true
						parcel = e
					}}
				/>
			)

			event = {
				target: {
					value: '1000000',
					id: 'test'
				}
			}
			Simulate.change(findDOMNode(component), event)
		})

		afterEach(() => {
			called = false
			parcel = null
		})

		it('should be run when input is changed', () => {
			expect(called).toBe(true)
		})

		it('should be passed the original event', () => {
			expect(parcel.target).toEqual(event.target)
		})
	})

	describe('onBlur', () => {
		const value = 900000
		let called = false
		let event
		let component
		let parcel

		beforeEach(() => {
			component = TestUtils.renderIntoDocument(
				<NumberInput
					id="test"
					value={value}
					onBlur={(e) => {
						called = true
						parcel = e
					}}
				/>
			)

			event = {
				target: {
					value: '1000000',
					id: 'test'
				}
			}

			const node = findDOMNode(component)
			Simulate.blur(node, event)
		})

		it('should be run when input is blurred', () => {
			expect(called).toBe(true)
		})

		it('should be passed unformatted value', () => {
			expect(parcel.target).toEqual(event.target)
		})
	})

	describe('onFocus', () => {
		const value = 900000
		let called = false
		let event
		let component
		let parcel

		beforeEach(() => {
			component = TestUtils.renderIntoDocument(
				<NumberInput
					id="test"
					value={value}
					onFocus={(e) => {
						called = true
						parcel = e
					}}
				/>
			)

			event = {
				target: {
					value: '1000000',
					id: 'test'
				}
			}

			const node = findDOMNode(component)
			Simulate.focus(node, event)
		})

		it('should be run when input is blurred', () => {
			expect(called).toBe(true)
		})

		it('should be passed unformatted value', () => {
			expect(parcel.target).toEqual(event.target)
		})
	})

	describe('isNumber', () => {
		const wrong = [
			undefined,
			null,
			'Hello World',
			{ key: 0 },
			function noop() {},
			true,
			false
		]

		wrong.forEach((arg) => {
			it('should return false when fed incorrect argument: [' + typeof arg + ', ' + arg + ']', () => {
				expect(isNumber(arg)).toBe(false)
			})
		})
	})

	describe('formatNumber', () => {
		const wrong = [
			undefined,
			null,
			'Hello World',
			{ key: 0 },
			function noop() {},
			true,
			false
		]

		wrong.forEach((arg) => {
			it('should return 0 when fed incorrect argument: [' + typeof arg + ', ' + arg + ']', () => {
				expect(formatNumber(arg)).toBe(null)
			})
		})

		it('should add comma separators correctly when input is correct', () => {
			expect(formatNumber(1000000)).toBe('1,000,000')
			expect(formatNumber(1000000.9)).toBe('1,000,000.9')
			expect(formatNumber(1000000.94)).toBe('1,000,000.94')
			expect(formatNumber(-1000000.94)).toBe('-1,000,000.94')

			expect(formatNumber('1000000')).toBe('1,000,000')
			expect(formatNumber('1000000.9')).toBe('1,000,000.9')
			expect(formatNumber('1000000.94')).toBe('1,000,000.94')
			expect(formatNumber('-1000000.94')).toBe('-1,000,000.94')

			expect(formatNumber('1,000,000')).toBe('1,000,000')
			expect(formatNumber('1,000,000.9')).toBe('1,000,000.9')
			expect(formatNumber('1,000,000.94')).toBe('1,000,000.94')
			expect(formatNumber('-1,000,000.94')).toBe('-1,000,000.94')
		})
	})

	describe('parseNumber', () => {
		const wrong = [
			undefined,
			null,
			'Hello World',
			{ key: 0 },
			function noop() {},
			true,
			false
		]

		wrong.forEach((arg) => {
			it('should return 0 when fed incorrect argument: [' + typeof arg + ', ' + arg + ']', () => {
				expect(isNaN(parseNumber(arg))).toBe(true)
			})
		})


		it('should convert to number when input is correct', () => {
			expect(parseNumber(1000000)).toBe(1000000)
			expect(parseNumber(1000000.9)).toBe(1000000.9)
			expect(parseNumber(1000000.94)).toBe(1000000.94)
			expect(parseNumber(-1000000.94)).toBe(-1000000.94)

			expect(parseNumber('1000000')).toBe(1000000)
			expect(parseNumber('1000000.9')).toBe(1000000.9)
			expect(parseNumber('1000000.94')).toBe(1000000.94)
			expect(parseNumber('-1000000.94')).toBe(-1000000.94)

			expect(parseNumber('1,000,000')).toBe(1000000)
			expect(parseNumber('1,000,000.9')).toBe(1000000.9)
			expect(parseNumber('1,000,000.94')).toBe(1000000.94)
			expect(parseNumber('-1,000,000.94')).toBe(-1000000.94)
		})
	})
})
