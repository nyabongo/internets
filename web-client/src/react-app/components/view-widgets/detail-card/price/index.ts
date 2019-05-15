import currencies from './currencies';

export const formatPrice = ({ value, currency }:
{ value: number | string; currency: string }): string => {
  const val = value.toString().replace(/,/g, '');
  if (currencies[currency]) {
    const { symbol, decimal_digits: decimalDigits } = currencies[currency];
    const formattedPrice = `${symbol} ${Number(parseFloat(`${val}`).toFixed(decimalDigits)).toLocaleString()}`;
    return formattedPrice;
  }
  return `${currency} ${value}`;
};
export default formatPrice;
