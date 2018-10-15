import React from 'react';
import mount from 'enzyme/mount';
import ListItem from '@material-ui/core/ListItem';
import ISP from '.';

const mockPlans = [];

describe('ISP', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<ISP isp="ISP name" plans={mockPlans} onSelect={jest.fn()} />);
  });
  it('should render', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('should contain the ispname in its text', () => {
    expect(wrapper.text()).toEqual(expect.stringContaining(wrapper.prop('isp')));
  });
  it('shoud contain a list item that calls onSelect when clicked', () => {
    wrapper.find(ListItem).simulate('click');
    expect(wrapper.prop('onSelect')).toHaveBeenCalled();
  });
});
