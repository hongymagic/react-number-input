/* eslint no-console: 0 */

import React, {Component} from 'react'
import NumberInput from '../../src/react-number-input'

export default class Demo extends Component {
	constructor(props) {
		super(props)

		this.state = {
			age: 30
		}

		this.onNumberChange = this.onNumberChange.bind(this)
		this.onNumberBlur = this.onNumberBlur.bind(this)
	}

	onNumberChange(event) {
		console.log(`onChange trigged on #${event.target.id} with ${event.target.value}`, event.target.id, event.target.value)

		const state = {}
		state[event.target.id] = event.target.value
		this.setState(state)
	}

	onNumberBlur(event) {
		console.log(`onBlur trigged on #${event.target.id} with ${event.target.value}`, event.target.id, event.target.value)

		const state = {}
		state[event.target.id] = event.target.value
		this.setState(state)
	}

	render() {
		return (
			<form>
				<fieldset>
					<legend>Standard integers without thousand separators</legend>
					<label htmlFor="age">
						Your age ({this.state.age})
					</label>
					<NumberInput
						id="age"
						format="0"
						value={this.state.age}
						onChange={this.onNumberChange}
						onBlur={this.onNumberBlur}
					/>
				</fieldset>
			</form>
		)
	}
}
