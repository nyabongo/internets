import React from 'react';
import mount from 'enzyme/mount';
import ListItem from '@material-ui/core/ListItem';
import CheckIcon from '@material-ui/icons/Check';
import ISP from '.';

const mockPlans = [];

describe('ISP', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<ISP
      isp="ISP name"
      plans={mockPlans}
      selected={false}
      onSelect={jest.fn()}
    />);
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
  it('should not contain a checkicon if it has a selected prop set to true', () => {
    expect(wrapper.prop('selected')).toBeFalsy();
    expect(wrapper.find(CheckIcon)).toHaveLength(0);
  });
  it('should contain a checkicon if it has a selected prop set to true', () => {
    wrapper.setProps({ selected: true });
    wrapper.update();
    expect(wrapper.find(CheckIcon)).toHaveLength(1);
  });
});
