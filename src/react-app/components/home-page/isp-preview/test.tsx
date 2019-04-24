import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import ISPPreview from '.';

describe('ISPPreview', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<ISPPreview />);
  });
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
