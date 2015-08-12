import React from 'react';
import NumberInput from './react-number-input.jsx';

let Demo = React.createClass({
	getInitialState: function () {
		return {
			amount1: null,
			amount2: 1000,
			amount3: 'Hello World',
			amount4: 1000
		};
	},

	componentDidMount: function () {
		console.clear();
	},

	onAmountChange: function (event) {
		var state = {};

		if (event.target.id) {
			state[event.target.id] = NumberInput.parseNumber(event.target.value);
			this.setState(state);

			console.log('New number received for %s: %d', event.target.id, state[event.target.id]);
		}
	},

	onAmountBlur: function (event) {
	},

	onAmountFocus: function (event) {
	},

	onAmountKeyPress: function (event) {
	},

	render: function () {
		return (
			<div>
				<div>
					<label htmlFor='amount1'>Input with null value in state</label>
					<NumberInput
						id='amount1'
						onChange={this.onAmountChange}
						onBlur={this.onAmountBlur}
						onFocus={this.onAmountFocus}
						onKeyPress={this.onAmountKeyPress}
						placeholder='Enter any amount1'
						value={this.state.amount1}
					/>
				</div>
				<div>
					<label htmlFor='amount2'>Input with value from state</label>
					<NumberInput
						id='amount2'
						onChange={this.onAmountChange}
						onBlur={this.onAmountBlur}
						onFocus={this.onAmountFocus}
						onKeyPress={this.onAmountKeyPress}
						placeholder='Enter any amount2'
						value={this.state.amount2}
					/>
				</div>
				<div>
					<label htmlFor='amount3'>Input with wrong value from state</label>
					<NumberInput
						id='amount3'
						onChange={this.onAmountChange}
						onBlur={this.onAmountBlur}
						onFocus={this.onAmountFocus}
						onKeyPress={this.onAmountKeyPress}
						placeholder='Enter any amount3'
						value={this.state.amount3}
					/>
				</div>
				<div>
					<label htmlFor='amount4'>Input with custom format</label>
					<NumberInput
						id='amount4'
						onChange={this.onAmountChange}
						onBlur={this.onAmountBlur}
						onFocus={this.onAmountFocus}
						onKeyPress={this.onAmountKeyPress}
						placeholder='Enter any amount4'
						format='0,0'
						value={this.state.amount4}
					/>
				</div>
			</div>
		);
	}
});

React.render(
	<Demo />,
	document.body
);

