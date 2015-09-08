/* eslint no-console: 0 */

import React, {Component} from 'react'
import Field from './Field'

export default class Demo extends Component {
	constructor(props) {
		super(props)

		this.state = {
			age: 30,
			worth: 1500000,
			height: 181.5,
			weight: 75.82
		}
	}

	render() {
		return (
			<form>
				<Field
					id="age"
					title="Standard integer without formatting"
					label="Your age"
					value={this.state.age}
					format="0"
					min={0}
					max={150}
					step={1}
				/>
				<Field
					id="worth"
					title="Standard integer with formatting"
					label="Your net worth"
					value={this.state.worth}
					format="0,0"
					min={-100000000}
					max={100000000}
					step={100}
				/>
				<Field
					id="height"
					title="Standard floating point number with optional decimals (2 sig)"
					label="Your height (in cm)"
					value={this.state.height}
					format="0,0[.][00]"
					min={0}
					max={500}
					step={0.5}
				/>
				<Field
					id="weight"
					title="Standard floating point number with explicit decimals (2 sig)"
					label="Your weight (in kg)"
					value={this.state.weight}
					format="0,0.00"
					min={0}
					max={500}
					step={0.05}
				/>
			</form>
		)
	}
}
