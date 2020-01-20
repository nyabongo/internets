import React from 'react';
import { mount, ReactWrapper } from 'enzyme';
import Providers from './providers';
import HomePage from '.';

jest.mock('./providers', () => () => null);

describe('HomePage', () => {
  let wrapper: ReactWrapper;
  beforeEach(() => {
    wrapper = mount(<HomePage />);
  });
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('should render providers', () => {
    expect(wrapper.find(Providers)).toBeTruthy();
  });
});
