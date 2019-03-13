import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import App from '.';

describe('App', () => {
  let wrapper:ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
