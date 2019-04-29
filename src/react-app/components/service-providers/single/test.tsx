import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import ProviderPage from '.';

describe('ProviderPage', () => {
  let wrapper: ReactWrapper;
  const id = 'provider-id';
  beforeEach(() => {
    wrapper = mount(<ProviderPage id={id} />);
  });
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
});
