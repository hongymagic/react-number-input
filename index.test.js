import React from 'react';
import NumberInput from './index';
import { shallow } from 'enzyme';

test('empty props (value) displays empty string', () => {
	const component = shallow(
		<NumberInput />
	);

	expect(component.text()).toEqual('');
});

const testFormat = (value, format, expected) =>
	test(`value (${value}) adheres to given format (${format})`, () => {
		const component = shallow(
			<NumberInput value={value} format={format} />
		);

		expect(component.find('input').props().value).toEqual(expected);
	});

testFormat(1234567890, '0,0', '1,234,567,890');
testFormat(1234567890, '0', '1234567890');
testFormat(1234567890, '0,0.00', '1,234,567,890.00');
testFormat(1234567890, '$0,0.00', '$1,234,567,890.00');
testFormat(3.14275, '0,0', '3');
testFormat(3.14275, '0,0.00', '3.14');
testFormat(-3.14275, '0,0.00', '-3.14');

const testOnChange = (value, expected) =>
	test('onChange passes (number | null) as first argument', () => {
		const onChange = jest.fn();
		const component = shallow(
			<NumberInput onChange={onChange} value={1000} />
		);

		component.find('input').simulate('change', { target: { value }});
		expect(onChange).toBeCalledWith(expected, expect.anything());
	});

testOnChange('', null);
testOnChange('123456', 123456);
testOnChange('-123', -123);
testOnChange('asdf', null);
