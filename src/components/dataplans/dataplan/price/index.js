import React from 'react';
import PropTypes from 'prop-types';
import currencies from '../../../currency-select/currencies';

const Price = ({ value: { price, priceCurrency: currency } }) => {
  const p = parseFloat(price).toFixed(currencies[currency].decimal_digits);
  const { symbol } = currencies[currency];

  return (
    <div style={{ whiteSpace: 'nowrap' }}>
      {`${symbol}${Number(p).toLocaleString()}`}
    </div>
  );
};

Price.propTypes = {
  value: PropTypes.shape({
    price: PropTypes.number.isRequired,
    priceCurrency: PropTypes.oneOf(Object.keys(currencies)),
  }).isRequired,
};
export default Price;
