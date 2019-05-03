import { formatPrice } from '.';
import currencies from './currencies';

const price = {
  value: 466.00,
  currency: 'UGX',
};
const unknownCurrencyPrice = {
  value: 676,
  currency: 'YYY',
};
describe('formatPrice', () => {
  it('should return a formated price', () => {
    const { symbol, decimal_digits: decimalDigits } = currencies[price.currency];
    const formattedPrice = `${symbol} ${Number(parseFloat(`${price.value}`).toFixed(decimalDigits)).toLocaleString()}`;
    expect(formatPrice(price)).toBe(formattedPrice);
  });
  it('should work with an unknown currency', () => {
    const { value, currency } = unknownCurrencyPrice;
    const expected = `${currency} ${value}`;
    expect(formatPrice(unknownCurrencyPrice)).toBe(expected);
  });
});
