[![Build Status](https://travis-ci.org/hongymagic/react-number-input.svg?branch=master)](https://travis-ci.org/hongymagic/react-number-input)

# React Number Input component

HTML `input` element clone with support for post-edit formatting of number
values. An input of `1000000` will format to `1,000,000` under `en-AU` locale.

## Usage

Usage via __npm__ and __webpack__ is recommended at this stage.

### Install

```
npm install --save react-number-input
```

### Use

Use it like a normal [react form](http://facebook.github.io/react/docs/forms.html) element.

```jsx
<NumberInput
	id="price"
	onChange={this._onPriceChange}
	value={this.state.price}
	placeholder="Enter price"
/>
```

All properties supplied to `NumberInput` will also be transferred to the
resulting `input` element.

### Supported event handlers

All event handlers supported by `<input />` are supported.

All of the event handlers receive the original event object as its argument.

```jsx
React.createClass({
	_onChange: function (event) {
		console.log(event.target.id);; // test
	},

	render: function () {
		return (
			<NumberInput
				id='test'
				onChange={this._onChange}
				value={this.state.price}
				format='0,0'
				placeholder='0'
			/>
		);
	}
});
```

`format='0,0'` follows [numeral.js](http://numeraljs.com) format. Defaults to: `'0,0[.][00]`.

## Contributing / Developing / Running demo

If you're thinking of contributing, there are a number of npm scripts you
can run to speed up the process.

### Building react-number-input

```
npm install
npm run build
```

### Testing react-number-input

This uses `jest-cli` version `0.4.x` and therefore it requires node version
`0.10.x` to run tests. Note that the component itself can be used in newer
node versions.

```
npm run test
```

### Building and running the demo

```
npm run demo-build
npm run demo-server
```

Then head to [http://localhost:8080/](http://localhost:8080) to see the demo.

## Note

* Renders `input[type=tel]` element, can be overriden by providing `type` property
* Number formatting is removed on focus
* Number formatting is applied on blur
* If input contains all zeroes, zeroes are left in place until blur

## TODO

* Add support for different locales
* Assume __en-AU__ locale
* Currently requires [`numeral`](http://numeraljs.com)
