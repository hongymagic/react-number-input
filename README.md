[![Build Status](https://travis-ci.org/hongymagic/react-number-input.svg?branch=master)](https://travis-ci.org/hongymagic/react-number-input)

# React Number Input component

HTML `input` element clone with support for post-edit formatting of number
values. An input of `1000000` will format to `1,000,000` under `en-AU` locale.

## Usage

Usage via __npm__ and __browserify__ is recommended at this stage.

### Install

```
npm install --save react-number-input
```

### Use

Use it like a normal _controlled_ react form element.

```jsx
<NumberInput id="price" onChange={this._onPriceChange} value={this.state.price} />
```

All properties supplied to `NumberInput` will also be transferred to the
resulting `input` element.

### Supported event handlers

Supported event handlers are:

* onChange
* onFocus
* onBlur

All of the event handlers receive the pure numeric value of the input.

```jsx
React.createClass({
	_onChange: function (value) {
		console.log(typeof value); // number or undefined
	},

	render: function () {
		return (
			<NumberInput onChange={this._onChange} value={this.state.price} />
		);
	}
});
```

## Note

* Renders `input[type=tel]` element, can be overriden by providing `type` property
* Number formatting is removed on focus
* Number formatting is applied on blur
* If input contains all zeroes, zeroes are left in place until blur
* Limited/No support for negative numbers
* Currently requires [`numeral`](http://numeraljs.com)
* Assume __en-AU__ locale

## TODO

* Add support for different locales
