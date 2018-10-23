import React from 'react';
import mount from 'enzyme/mount';
import CurrencySelect from '.';

describe('CurrencySelect', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<CurrencySelect />);
  });
  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
