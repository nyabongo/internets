import React from 'react';
import mount from 'enzyme/mount';
import Price from '.';

const ugxPrice = {
  price: 199999,
  priceCurrency: 'UGX',
};

describe('Price', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<Price value={ugxPrice} />);
  });
  it('should render', () => {
    expect(wrapper.exists()).toBe(true);
  });
});
