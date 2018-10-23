import React from 'react';
import mount from 'enzyme/mount';
import Select from '@material-ui/core/Select';
import CurrencySelect from '.';

describe('CurrencySelect', () => {
  let wrapper;
  let select;
  beforeEach(() => {
    wrapper = mount(<CurrencySelect onChange={jest.fn()} />);
    select = wrapper.find(Select);
  });
  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('should contain a Select', () => {
    expect(select).toHaveLength(1);
  });
  it('should call its onChange prop with the value in the select\'s onChange parameter', () => {
    const change = { target: { value: 'a - value' } };
    select.prop('onChange')(change);
    expect(wrapper.prop('onChange')).toHaveBeenCalledWith(change.target.value);
  });
});
