import currencies from './currencies';

export const formatPrice = ({ value, currency }: {value: number; currency: string}): string => {
  if (currencies[currency]) {
    const { symbol, decimal_digits: decimalDigits } = currencies[currency];
    const formattedPrice = `${symbol} ${Number(parseFloat(`${value}`).toFixed(decimalDigits)).toLocaleString()}`;
    return formattedPrice;
  }
  return `${currency} ${value}`;
};
export default formatPrice;
