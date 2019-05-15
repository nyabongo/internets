import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import PlansTable from '.';

describe('PlansTable', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<PlansTable />);
  });
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
