import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import PageRouter from '.';

describe('PageRouter', () => {
  let wrapper:ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<PageRouter />);
  });
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
