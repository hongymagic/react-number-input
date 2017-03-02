import React from 'react';
import { storiesOf, action } from '@kadira/storybook';
import NumberInput from '../index.js';

storiesOf('NumberInput', module)
	.add('without any properties', () => (
		<NumberInput
			onChange={action('change')}
		/>
	))
	.add('with value', () => (
		<NumberInput
			value={1234567890}
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

