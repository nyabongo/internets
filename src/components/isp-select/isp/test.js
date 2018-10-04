import React from 'react';
import mount from 'enzyme/mount';
import ISP from '.';

const mockPlans = [];

describe('ISP', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<ISP isp="ISP name" plans={mockPlans} />);
  });
  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('should contain the ispname in its text', () => {
    expect(wrapper.text()).toEqual(expect.stringContaining(wrapper.prop('isp')));
  });
});
