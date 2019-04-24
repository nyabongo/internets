import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import ProvidersList from '.';

describe('ProvidersList', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<ProvidersList />);
  });
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
