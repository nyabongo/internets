import React from 'react';
import PropTypes from 'prop-types';

const CurrencySelect = ({ value, onChange }) => (
  <div>
      Currency Select
    {' '}
    {JSON.stringify({ value, onChange })}
  </div>
);

CurrencySelect.propTypes = {
  value: PropTypes.string,
  onChange: PropTypes.func,
};

CurrencySelect.defaultProps = {
  value: 'UGX',
  onChange: undefined,
};

export default CurrencySelect;
