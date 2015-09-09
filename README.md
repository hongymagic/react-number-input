[![Build Status](https://travis-ci.org/hongymagic/react-number-input.svg?branch=master)](https://travis-ci.org/hongymagic/react-number-input)

# React Number Input component

HTML `input` element clone with support for post-edit formatting of number
values. An input of `1000000` will format to `1,000,000` under `en-AU` locale.

## Usage

Usage via __npm__ and __webpack__ is recommended at this stage. `build/`
contains UMD compatible javascript which could be used in browsers.

### Demo

[See for yourself](https://cdn.rawgit.com/hongymagic/react-number-input/e07e8aca0b1a213db5e2ad07e5aefd74aa001db7/demos/demo0/index.html)

### Install

React version of the form `react@0.x` maps to `react-number-input@1.x`. Currently
supports 0.12, 0.13 and 0.14.

#### React@0.14.x

```
npm install --save react-number-input@1.14
```

#### React@0.13.x

```
npm install --save react-number-input@1.13
```

#### React@0.12.x

```
npm install --save react-number-input@1.12
```

### Use

Use it like a normal [react form](http://facebook.github.io/react/docs/forms.html) element.

```jsx
<NumberInput
	id="price"
	type="number"                   // optional, input[type]. Defaults to "tel" to allow non numeric characters
	onChange={this.onPriceChange}   // use it like normal event handler
	onBlur={this.onPricedUpdated}   // use it like normal event handler
	onFocus={this.onPricedEditing}  // use it like normal event handler
	value={this.state.price}        // normal react input binding
	placeholder="Enter price"       // all other input properties are supported
	min={0}                         // optional, set minimum allowed value
	max={100}                       // optional, set maximum allowed value
	format="0"                      // optional, numeral.js format string. Defaults to "0,0[.][00]"
/>
```

All properties supplied to `NumberInput` will also be transferred to the
resulting `input` element (e.g., `style` or `className`).

### Supported event handlers

All event handlers supported by `<input />` are supported.

All of the event handlers receive the original event object as its argument.

```jsx
React.createClass({
	_onChange: function (event) {
		console.log(event.target.id); // test
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

`format="0,0"` follows [numeral.js](http://numeraljs.com) format. Defaults to: `"0,0[.][00]"`.

## Behaviour

* You get raw, unchange event object `onChange`
* You get filtered, modified `event.target.value` `onBlur`

Basically, it allows users to enter anything they want by default. Only `onBlur`, we change
that to map to whatever is specified in `format` property.

## Contributing / Developing / Running demo

If you're thinking of contributing, there are a number of npm scripts you
can run to speed up the process.

### Building react-number-input

```
npm install
npm run prerelease
```

### Testing react-number-input

```
npm run lint
npm run test
```

### Building and running the demo

```
npm run build-demos
npm run start
```

Then head to [http://localhost:3000/](http://localhost:3000) to see the demo.

## Note

* Renders `input[type=tel]` element, can be overriden by providing `type` property
* Number formatting is removed on focus
* Number formatting is applied on blur
* If input contains all zeroes, zeroes are left in place until blur

## TODO

* Add support for different locales
* Assume __en-AU__ locale
* Currently requires [`numeral`](http://numeraljs.com)
