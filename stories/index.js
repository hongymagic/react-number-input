import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import NumberInput from '../index.js';

storiesOf('NumberInput', module)
	.add('without any properties', () => (
		<NumberInput
			onChange={action('change')}
		/>
	))
	.add('with value = null', () => (
		<NumberInput
			value={null}
			onChange={action('change')}
		/>
	))
	.add('with value = ""', () => (
		<NumberInput
			value={''}
			onChange={action('change')}
		/>
	))
	.add('with value 0', () => (
		<NumberInput
			value={0}
			format="0.000"
			onChange={action('change')}
		/>
	))
	.add('with value 1000', () => (
		<NumberInput
			value={1000}
			onChange={action('change')}
		/>
	))
	.add('with value and optional decimal format "0,0[.]000"', () => (
		<NumberInput
			value={3.1427}
			format="0,0[.]000"
			onChange={action('change')}
		/>
	))
	.add('with events', () => (
		<NumberInput
			value={3.1427}
			format="0,0[.]000"
			onChange={action('change')}
			onBlur={action('blur')}
			onFocus={action('focus')}
		/>
	));

