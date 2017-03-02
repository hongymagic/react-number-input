import React from 'react';
import numbro from 'numbro';
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

const testOnChange = (value, expected, format = '0,0') => {
	describe(`simulate changing value = "${value}", expected = "${expected}", format = "${format}"`, () => {
		test(`onChange to "${value}" passes "${expected}" as first argument`, () => {
			const onChange = jest.fn();
			const component = shallow(
				<NumberInput
					format={format}
					value={1000}
					onChange={onChange}
				/>
			);

			component.find('input').simulate('change', { target: { value }});
			component.find('input').simulate('blur', { target: { value }});
			component.find('input').simulate('focus', {});
			expect(onChange).toBeCalledWith(expected, expect.anything());
		});

		test(`input renders ${expected} after onChange`, () => {
			const component = shallow(
				<NumberInput
					format={format}
					value={1000}
				/>
			);

			component.find('input').simulate('change', { target: { value }});
			expect(component.find('input').props().value).toEqual(expected === null ? '' : numbro(expected).format(format));
		});
	});
};

testOnChange('', null);
testOnChange('123456', 123456);
testOnChange('-123', -123);
testOnChange('asdf', null);
testOnChange('3.142', 3.14, '0.00');
testOnChange('3.1427584', 3.14, '0.00');
