import React from 'react';
import numbro from 'numbro';
import NumberInput from './index';
import { shallow } from 'enzyme';

const testInitialFormat = states => {
  const _test = (value, format, expected) =>
    test(`value '${value}' formatted to '${format}' should display '${expected}'`, () => {
      const component = shallow(<NumberInput value={value} format={format} />);

      expect(component.find('input').props().value).toEqual(expected);
    });

  describe('initial render()', () => {
    states.forEach(([value, format, expected]) =>
      _test(value, format, expected));
  });
};

testInitialFormat([
  [null, '0,0', ''],
  [null, '0,0.000', ''],
  [0, '0,0', '0'],
  [0, '0,0.000', '0.000'],
  [1.234567, '0', '1'],
  [1.234567, '0.00', '1.23'],
  [1, '0,0', '1'],
  [1000000, '0,0', '1,000,000'],
  [-1000000, '0,0', '-1,000,000'],
  [-1000000, '(0,0)', '(1,000,000)'],
  ['abcde', '0', ''],
  ['5m', '0,0', '5,000,000'],
  ['a123bcde', '0', '123'],
]);
const testOnChange = (value, arg, expected, format = '0,0') => {
  describe(`simulate changing value = "${value}", expected = "${arg}", format = "${format}"`, () => {
    test(`onChange to "${value}" passes "${arg}" as first argument`, () => {
      const onChange = jest.fn();
      const component = shallow(
        <NumberInput
          min={-1000}
          max={1000000}
          format={format}
          value={1000}
          onChange={onChange}
        />
      );

      component.find('input').simulate('change', { target: { value } });
      expect(onChange).toBeCalledWith(arg, expect.anything());
    });

    test(`input renders ${expected} after onChange`, () => {
      const component = shallow(
        <NumberInput min={-1000} max={1000000} format={format} value={1000} />
      );

      component.find('input').simulate('change', { target: { value } });
      component.find('input').simulate('blur', { target: { value } });
      expect(component.find('input').props().value).toEqual(
        expected == null || expected == ''
          ? ''
          : numbro(expected).format(format)
      );
    });
  });
};

// testOnChange(value, expectedArg, expectedDisplayValue, format)
testOnChange('', null, '');
testOnChange('123456', 123456, '123,456');
testOnChange('-123', -123, '-123');
testOnChange('asdf', null, '');
testOnChange('3.142', 3.14, '3.14', '0.00');
testOnChange('3.1427584', 3.14, '3.14', '0.00');
testOnChange('-50000', -1000, '-1,000', '0.00');
testOnChange('50000000', 1000000, '1,000,000', '0.00');
