import React from 'react';
import mount from 'enzyme/mount';
import DataPlans from './components/dataplans';
import App from './App';

describe('App', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = mount(<App />);
  });
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('should contain the DataPlans component', () => {
    expect(wrapper.find(DataPlans).exists()).toBeTruthy();
  });
});
