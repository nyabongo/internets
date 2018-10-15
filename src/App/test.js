import React from 'react';
import mount from 'enzyme/mount';
import DataPlans from '../components/dataplans';
import ISPSelect from '../components/isp-select';
import mockDataplans from './with-dataplans/example-dataplans';
import App from '.';

const mockUpdateFilters = jest.fn();
const mockFilters = {};
jest.mock('./with-dataplans',
  () => C => p => <C {...p} dataplans={mockDataplans} />);
jest.mock('./with-filter',
  () => C => p => <C {...p} updateFilters={mockUpdateFilters} filters={mockFilters} />);
describe('App', () => {
  let wrapper;
  let isps;
  beforeEach(() => {
    wrapper = mount(<App />).find('App');
    isps = wrapper.find(ISPSelect);
  });
  it('should render without crashing', () => {
    expect(wrapper.exists()).toBeTruthy();
  });
  it('should contain the DataPlans component', () => {
    expect(wrapper.find(DataPlans).exists()).toBeTruthy();
  });
  it('should pass the dataplans to the Dataplans component', () => {
    expect(wrapper.find(DataPlans).prop('dataplans')).toBe(mockDataplans);
  });
  it('should contain dataplans from mockDataplans', () => {
    expect(wrapper.prop('dataplans')).toBe(mockDataplans);
  });
  it('should render the ISP component', () => {
    expect(isps.exists()).toBeTruthy();
  });
  it('should pass the dataplans to the ISP component', () => {
    expect(isps.prop('dataplans')).toBe(mockDataplans);
  });
  describe('withFilter', () => {
    let updateFilters;
    let filters;
    beforeEach(() => {
      updateFilters = wrapper.prop('updateFilters');
      filters = wrapper.prop('filters');
    });
    it('should receive mockUpdateFilters from with-filter as its updateFilter prop', () => {
      expect(wrapper.prop('updateFilters')).toBe(mockUpdateFilters);
    });
    it('should receive mockFilters from with-filter as its updateFilter prop', () => {
      expect(wrapper.prop('filters')).toBe(mockFilters);
    });
    it('should pass the updateFilter prop to the ISP component', () => {
      expect(isps.prop('updateFilters')).toBe(updateFilters);
    });
    it('should pass the filters prop to the ISP component', () => {
      expect(isps.prop('filters')).toBe(filters);
    });
  });
});
