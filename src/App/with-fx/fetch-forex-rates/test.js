import fetchForexRates from '.';

describe('fetchForexRates', () => {
  it('should be a function', () => {
    expect(fetchForexRates).toBeInstanceOf(Function);
    fetchForexRates();
  });
});
