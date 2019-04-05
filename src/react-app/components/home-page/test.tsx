import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import HomePage from '.';

describe('HomePage', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<HomePage />);
  });
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
