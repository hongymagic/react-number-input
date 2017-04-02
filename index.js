/* @flow */

import React, { Component, Element } from 'react';
import numbro from 'numbro';

// <NumberInput value={VALUE_TYPE} />
//
// NumberInput takes in a number or a null value; Null value indicates that the
// input is empty i.e., '' in traditional react <input /> world. onChange event
// also takes in the VALUE_TYPE.
type VALUE_TYPE = number | null;

// The default number format is an integer with thousand-separators. This can be
// changed via the prop `format` <NumberInput format="0,0[.00]" value={3.1427} />.
const DEFAULT_FORMAT = '0,0';

const toFormattedString = (value: VALUE_TYPE, format: string): string => {
  if (value === undefined || value === null) {
    return '';
  }

  let boxed = numbro(value);
  if (isNaN(boxed.value())) {
    return '';
  }

  return boxed.format(format);
};

const toValue = (value: string): VALUE_TYPE => {
  if (!value) {
    return null;
  }

  const unformatted = numbro().unformat(value);
  return unformatted;
};

const normalisedValue = (value: string, format: string): VALUE_TYPE =>
  toValue(toFormattedString(toValue(value), format));

const constrainedValue = (
  value: VALUE_TYPE,
  min: VALUE_TYPE,
  max: VALUE_TYPE
): VALUE_TYPE => {
  if (value === null) {
    return null;
  }

  if (min !== null && value < min) {
    return min;
  }

  if (max !== null && value > max) {
    return max;
  }

  return value;
};

/// react-number-input
/// <NumberInput value={0}    /> => [    0]
/// <NumberInput value={null} /> => [     ]
/// <NumberInput value={1000} /> => [ 1000]
///
/// <input /> field which maps to a value of type `number`.

type Props = {
  value: VALUE_TYPE,
  type?: string,
  min: VALUE_TYPE,
  max: VALUE_TYPE,

  // number format: see numbro docs for examples. Defaults to `0,0`.
  format: string,

  // <input /> onChange handler with number value as first argument.
  onChange: (value: VALUE_TYPE, event: any) => void,

  // Delegate rendering on <input /> to user.
  renderer?: (props: Object) => Element<*>,

  onBlur: (event: any) => void,
  onFocus: (event: any) => void,
};

type State = {
  focused: boolean,
  value: string,
};

export default class NumberInput extends Component {
  props: Props;
  state: State;

  static defaultProps = {
    format: DEFAULT_FORMAT,
    type: 'tel',
    onChange: (value: number) => value,
    onBlur: (value: any) => null,
    onFocus: (value: any) => null,
  };

  constructor(props: Props) {
    super(props);

    const { format, value } = props;

    // TODO: Add support for starting out as focused.
    this.state = {
      focused: false,
      value: toFormattedString(value, format),
    };
  }

  componentWillReceiveProps(nextProps: Props) {
    // Prevent changing value via props when input is focused.
    if (!this.state.focused && 'value' in nextProps) {
      this.setState({
        value: toFormattedString(
          nextProps.value,
          nextProps.format || this.props.format || DEFAULT_FORMAT
        ),
      });
    }
  }

  onBlur = (event: any) => {
    const { min, max, format, onBlur } = this.props;

    if ('persist' in event) {
      event.persist();
    }
    this.setState(
      {
        focused: false,
        value: toFormattedString(
          constrainedValue(normalisedValue(this.state.value, format), min, max),
          format
        ),
      },
      () => onBlur(event)
    );
  };

  onFocus = (event: any) => {
    if ('persist' in event) {
      event.persist();
    }
    let value = toValue(this.state.value);

    if (typeof value !== 'number') {
      value = '';
    }

    this.setState(
      {
        focused: true,
        value: '' + value,
      },
      () => this.props.onFocus(event)
    );
  };

  onChange = (event: any) => {
    const value = event.target.value;
    const { min, max, format, onChange } = this.props;

    if ('persist' in event) {
      event.persist();
    }
    this.setState(
      { value },
      // This ensures that decimal places are inline with supplied format.
      () =>
        onChange(
          constrainedValue(normalisedValue(value, format), min, max),
          event
        )
    );
  };

  render() {
    const { focused, value } = this.state;
    const { format, renderer, ...rest } = this.props;
    const displayValue = focused
      ? value
      : toFormattedString(toValue(value), format);
    const props = {
      ...rest,
      value: displayValue,
      onFocus: this.onFocus,
      onBlur: this.onBlur,
      onChange: this.onChange,
    };

    return renderer ? renderer(props) : <input {...props} />;
  }
}
