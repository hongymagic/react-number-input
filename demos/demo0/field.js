/* eslint no-console: 0 */

import React, {Component, PropTypes} from 'react'
import NumberInput from '../../src/react-number-input'

export default class Field extends Component {
	constructor(props) {
		super(props)

		// Receive initial value from props, doing this for demo purposes.
		// Not recommended practice in real world.
		this.state = { value: props.value }

		this.onChange = this.onChange.bind(this)
		this.onBlur = this.onBlur.bind(this)
	}

	onChange(event) {
		console.log(`onChange triggered #${event.target.id} with ${event.target.value}`)
		this.setState({
			value: event.target.value
		})
	}

	onBlur(event) {
		console.log(`onChange triggered #${event.target.id} with ${event.target.value}`)
		this.setState({
			value: event.target.value
		})
	}

	render() {
		const props = this.props
		const state = this.state

		return (
			<fieldset>
				<legend>{props.title}</legend>
				<label htmlFor={props.id}>
					{`${props.label} (${state.value})`}
				</label>
				<NumberInput
					{...props}
					value={state.value}
					onChange={this.onChange}
					onBlur={this.onBlur}
				/>
				<input
					type="range"
					min={props.min}
					max={props.max}
					step={props.step}
					value={state.value}
					onChange={this.onChange}
				/>
			</fieldset>
		)
	}
}

Field.propTypes = {
	id: PropTypes.string.isRequired,
	value: PropTypes.number.isRequired,
	title: PropTypes.string.isRequired,
	label: PropTypes.string.isRequired,
	format: PropTypes.string,
	min: PropTypes.number,
	max: PropTypes.number,
	step: PropTypes.number
}
Field.defaultProps = {
	format: '0,0[.][00]'
}

