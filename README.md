[![Build Status](https://travis-ci.org/hongymagic/react-number-input.svg?branch=master)](https://travis-ci.org/hongymagic/react-number-input)

# React Number Input component

HTML `input` element clone with support for post-edit formatting of number
values. An input of `1000000` will format to `1,000,000` under `en-AU` locale.

Uses `Intl` to provide support for more locales.

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

## Note

* Renders `input[type=tel]` element
* Number formatting is removed on focus
* Number formatting is applied on blur
* Limited/No support for decimals
* No support for negative integers
* Currently requires `intl` and `lodash`

## TODO

* More tests
* Remove lodash dependency
