/* @flow */

import React, { Component } from 'react';
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

const formatter = (value: VALUE_TYPE, format: string): string => {
	let formatted = numbro(value).format(format) || '';

	if (value === null) {
		formatted = '';
	}

	return formatted;
};

const unformatter = (value: string): VALUE_TYPE => {
	const unformatted = numbro().unformat(value) || null;
	return unformatted;
};

/// react-number-input
/// <NumberInput value={0}    /> => [    0]
/// <NumberInput value={null} /> => [     ]
/// <NumberInput value={1000} /> => [ 1000]
///
/// <input /> field which maps to a value of type `number`.

type Props = {
	value: number | null;
	type?: string;
	min?: number;
	max?: number;

	// number format: see numbro docs for examples. Defaults to `0,0`.
	format?: string;

	// <input /> onChange handler with number value as first argument.
	onChange: (value: VALUE_TYPE, event: Event) => void;
};

type State = {
	focused: boolean;
	value: string;
};

export default class NumberInput extends Component {
	props: Props;
	state: State;

	static defaultProps = {
		type: 'tel',
		onChange: (value: number) => value,
		format: DEFAULT_FORMAT,
	};

	constructor(props: Props) {
		super(props);

		const { format, value } = props;

		// TODO: Add support for starting out as focused.
		this.state = {
			focused: false,
			value: formatter(value, format),
		};
	}

	componentWillReceiveProps(nextProps: Props) {
		// Prevent changing value via props when input is focused.
		if (!this.state.focused && ('value' in nextProps)) {
			this.setState({
				value: formatter(
					nextProps.value,
					nextProps.format || this.props.format
				)
			});
		}
	}

	// TODO: Must event be of type `any`? (flow complains of event.target.value)
	onChange = (event: any) => {
		const { onChange } = this.props;
		const value = event.target.value;

		if ('persist' in event) {
			event.persist();
		}

		this.setState(
			{ value },
			() => onChange(unformatter(value), event)
		);
	}

	render() {
		const { focused, value } = this.state;
		const { format, ...rest } = this.props;
		const displayValue = focused
			? value
			: formatter(unformatter(value), format);

		return (
			<input
				{...rest}
				value={displayValue || ''}
				onFocus={() =>
					this.setState({
						focused: true,
						value: unformatter(value),
					})
				}
				onBlur={() => this.setState({ focused: false })}
				onChange={this.onChange}
			/>
		);
	}
}
