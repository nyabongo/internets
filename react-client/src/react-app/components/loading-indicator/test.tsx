import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import LoadingIndicator from '.';

describe('LoadingIndicator', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<LoadingIndicator />);
  });
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
