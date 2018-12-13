import React from 'react';
import mount from 'enzyme/mount';
import { IconButton } from '@material-ui/core';
import DataPlans from '../components/dataplans';
import ISPSelect from '../components/isp-select';
import CurrencySelect from '../components/currency-select';
import mockDataplans from './with-dataplans/example-dataplans';
import App from '.';

const mockUpdateFilters = jest.fn();
const mockFilters = {};
const mockSetCurrency = jest.fn();
const mockCurrency = 'KLX';

jest.mock('../components/currency-select', () => () => <div />);
jest.mock('../components/dataplans', () => () => <div />);

jest.mock('./with-fx', () => C => p => (
  <C {...p} setCurrency={mockSetCurrency} currency={mockCurrency} />
));
jest.mock('./with-dataplans', () => C => p => (
  <C {...p} dataplans={mockDataplans} />
));
jest.mock('./with-filter', () => C => p => (
  <C {...p} updateFilters={mockUpdateFilters} filters={mockFilters} />
));
describe('App', () => {
  let wrapper;
  let app;
  let isps;
  let currencySelect;
  beforeEach(() => {
    wrapper = mount(<App />);
    app = wrapper.find('App');
    isps = app.find(ISPSelect);
    currencySelect = app.find(CurrencySelect);
  });
  it('should render without crashing', () => {
    expect(app.exists()).toBeTruthy();
  });
  it('should have a clickable iconbutton', () => {
    const button = app.find(IconButton);
    button.simulate('click');
  });
  it('should contain the DataPlans component', () => {
    expect(app.find(DataPlans).exists()).toBeTruthy();
  });
  it('should pass the dataplans to the Dataplans component', () => {
    expect(app.find(DataPlans).prop('dataplans')).toBe(mockDataplans);
  });
  it('should contain dataplans from mockDataplans', () => {
    expect(app.prop('dataplans')).toBe(mockDataplans);
  });
  it('should render the ISP component', () => {
    expect(isps.exists()).toBeTruthy();
  });
  it('should render the CUrrencySelect component', () => {
    expect(currencySelect.exists()).toBeTruthy();
  });
  it('should pass the dataplans to the ISP component', () => {
    expect(isps.prop('dataplans')).toBe(mockDataplans);
  });
  describe('withFilter', () => {
    let updateFilters;
    let filters;
    beforeEach(() => {
      updateFilters = app.prop('updateFilters');
      filters = app.prop('filters');
    });
    it('should receive mockUpdateFilters from with-filter as its updateFilter prop', () => {
      expect(app.prop('updateFilters')).toBe(mockUpdateFilters);
    });
    it('should receive mockFilters from with-filter as its filters prop', () => {
      expect(app.prop('filters')).toBe(mockFilters);
    });
    it('should pass the updateFilter prop to the ISP component', () => {
      expect(isps.prop('updateFilters')).toBe(updateFilters);
    });
    it('should pass the filters prop to the ISP component', () => {
      expect(isps.prop('filters')).toBe(filters);
    });
  });

  describe('withFX', () => {
    let setCurrency;
    let currency;
    beforeEach(() => {
      setCurrency = app.prop('setCurrency');
      currency = app.prop('currency');
    });
    it('should receive mockSetCurrency from with-fx as its setCurrency prop', () => {
      expect(app.prop('setCurrency')).toBe(mockSetCurrency);
    });
    it('should receive mockCurrency from with-fx as its currency prop', () => {
      expect(app.prop('currency')).toBe(mockCurrency);
    });
    it('should pass the mockSetCurrency prop to the CurrencySelect component', () => {
      expect(currencySelect.prop('onChange')).toBe(setCurrency);
    });
    it('should pass the mockCurrency prop to the CurrencySelect component', () => {
      expect(currencySelect.prop('value')).toBe(currency);
    });
  });
});
