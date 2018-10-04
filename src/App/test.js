import React from 'react';
import mount from 'enzyme/mount';
import DataPlans from '../components/dataplans';
import mockDataplans from './with-dataplans/example-dataplans';
import App from '.';

jest.mock('./with-dataplans',
  () => C => p => <C {...p} dataplans={mockDataplans} />);
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
  it('should contain dataplans from mockDataplans', () => {
    expect(wrapper.childAt(0).prop('dataplans')).toBe(mockDataplans);
  });
  it('should pass the dataplans to the Dataplans component', () => {
    expect(wrapper.find(DataPlans).prop('dataplans')).toBe(mockDataplans);
  });
});
