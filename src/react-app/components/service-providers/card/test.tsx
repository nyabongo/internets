import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import ProviderCard from '.';

describe('ProviderCard', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<ProviderCard />);
  });
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
