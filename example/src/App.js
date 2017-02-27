import React, { Component } from 'react';
import NumberInput from 'react-number-input';
import './App.css';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			year: 2017,
			PI: Math.PI,
		};
	}

	render() {
		return (
			<div className="App">
				<div className="App-header">
					<h2>react-number-input</h2>
				</div>
				<p className="App-intro">
					<p>NumberInput without any values</p>
					<NumberInput />
					<p>NumberInput with thousand separators</p>
					<NumberInput value={this.state.year} />
					<p>NumberInput with decimal points (2 significant places)</p>
					<NumberInput value={this.state.PI} format="0.00" />
				</p>
			</div>
		);
	}
}

export default App;
