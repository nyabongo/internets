import React from 'react';
import mount from 'enzyme/mount';
import withFx from '.';
import fetchForexRates from './fetch-forex-rates';

jest.mock('./fetch-forex-rates');

const dataPlans = [
  {
    price: 2500,
    pricepergigabyte: 34133.33,
    id: 'plan-168',
  },
  {
    price: 2000,
    pricepergigabyte: 20480,
    id: 'plan-24',
  },
  {
    price: 5000,
    pricepergigabyte: 5000,
    id: 'plan-1',
  },
];
const fakeCurrencyCode = 'MNY';
const fakeRates = {
  [fakeCurrencyCode]: 10,
  UGX: 2,
};

const Subject = () => <div />;
const SubjectWithFX = withFx(Subject);

describe('withFx', () => {
  let wrapper;
  let subject;
  let subjectPlans;
  beforeEach(() => {
    fetchForexRates.mockReturnValue(Promise.resolve(fakeRates));
    wrapper = mount(<SubjectWithFX dataplans={dataPlans} />);
    subject = wrapper.find(Subject);
    subjectPlans = subject.prop('dataplans');
  });
  it('should render the subject', () => {
    expect(subject).toHaveLength(1);
  });
  it('should pass a currecy prop of "UGX" to the subject by default ', () => {
    expect(subject.prop('currency')).toEqual('UGX');
  });
  it('should convert the subject plans prices to objects with price and currency', () => {
    subjectPlans.forEach(({ price, pricepergigabyte }, i) => {
      expect(price).toEqual({ price: dataPlans[i].price, priceCurrency: 'UGX' });
      expect(pricepergigabyte).toEqual({ price: dataPlans[i].pricepergigabyte, priceCurrency: 'UGX' });
    });
  });
  describe('with fx conversion', () => {
    beforeEach(() => {
      subject.prop('setCurrency')(fakeCurrencyCode);
      wrapper.update();
      subject = wrapper.find(Subject);
      subjectPlans = subject.prop('dataplans');
    });
    it('should convert the subject plans prices to objects with price and the selected currency', () => {
      const ugRate = fakeRates.UGX;
      const fxRate = fakeRates[fakeCurrencyCode];
      subjectPlans.forEach(({ price, pricepergigabyte }, i) => {
        expect(price).toEqual({
          price: (dataPlans[i].price / ugRate) * fxRate,
          priceCurrency: fakeCurrencyCode,
        });
        expect(pricepergigabyte).toEqual({
          price: (dataPlans[i].pricepergigabyte / ugRate) * fxRate,
          priceCurrency: fakeCurrencyCode,
        });
      });
    });
  });
  it('should call fetchForexRates when it mounts', () => {
    expect(fetchForexRates).toHaveBeenCalled();
  });
});
