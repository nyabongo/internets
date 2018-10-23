import React from 'react';
import PropTypes from 'prop-types';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import currencies from './currencies';

const codes = Object.keys(currencies);

const CurrencySelect = ({ value, onChange }) => (
  <Select
    value={value}
    onChange={({ target: { value: val } }) => onChange(val)}
  >
    {
       codes.map(code => (
         <MenuItem key={code} value={code}>
           {currencies[code].name_plural}
         </MenuItem>
       ))
     }
  </Select>
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
