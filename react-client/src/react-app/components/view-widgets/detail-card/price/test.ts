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
const stringPrice = {
  value: '1,466,000.00',
  currency: 'UGX',
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
  it('should return a formated price with string value', () => {
    const { symbol, decimal_digits: decimalDigits } = currencies[stringPrice.currency];
    const formattedPrice = `${symbol} ${Number(parseFloat(`${stringPrice.value.toString().replace(/,/g, '')}`)
      .toFixed(decimalDigits)).toLocaleString()}`;
    expect(formatPrice(stringPrice)).toBe(formattedPrice);
  });
});
