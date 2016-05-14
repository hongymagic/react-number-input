/* eslint no-console: 0 */

import React, {Component} from 'react'
import Field from './Field'

const cultures = [
	'en-GB',
	'en-US',
	'fr-FR',
	'de-DE',
	'hu-HU',
	'ja-JP',
	'nl-NL'
]

export default class Demo extends Component {
	constructor(props) {
		super(props)

		this.state = {
			culture: 'en-US',
			age: 30,
			worth: 1500000,
			height: 181.5,
			weight: 75.82
		}

		this.onCultureChange = this.onCultureChange.bind(this)
	}

	onCultureChange(event) {
		this.setState({
			culture: event.target.value
		})
	}

	render() {
		return (
			<form>
				<fieldset>
					<legend>Culture selection</legend>
					<label htmlFor="culture">Select culture</label>
					<select
						id="culture"
						name="culture"
						onChange={this.onCultureChange}
						value={this.state.culture}
					>
						{cultures.map((culture) => <option key={culture} value={culture}>{culture}</option>)}
					</select>
					<p>There are more culture options as listed <a href="http://numbrojs.com/languages.html" target="_blank">on the numbro.js site</a>.</p>
				</fieldset>

				<Field
					id="age"
					title="Standard integer without formatting"
					label="Your age"
					value={this.state.age}
					format="0"
					min={0}
					max={150}
					step={1}
					culture={this.state.culture}
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
					culture={this.state.culture}
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
					culture={this.state.culture}
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
					culture={this.state.culture}
				/>
			</form>
		)
	}
}
