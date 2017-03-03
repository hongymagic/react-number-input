import React, { Component } from 'react';
import TextField from 'material-ui/TextField';
import NumberInput from '../../dist/index.js';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			year: 2017,
			PI: Math.PI,
		};
	}

	renderMaterialInput = (props) => {
		return (
			<TextField
				hintText="Eat a PI"
				floatingLabelText="Floating label text"
				floatingLabelFixed={true}
				{...props}
			/>
		);
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h2>react-number-input</h2>
				</div>
				<div className="App-intro">
					<p>NumberInput without any values</p>
					<NumberInput />
					<p>NumberInput with thousand separators</p>
					<NumberInput value={this.state.year} />
					<p>NumberInput with decimal points (2 significant places)</p>
					<NumberInput value={this.state.PI} format="0.00" />
					<p>Custom renderer</p>
					<NumberInput
						value={this.state.PI}
						format="0.00"
						renderer={this.renderMaterialInput}
					/>
				</div>
			</div>
		);
	}
}

export default App;
