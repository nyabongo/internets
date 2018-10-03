import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';
import Price from './price';

const Dataplan = ({
  plan: {
    isp, dataVolume,
    dataUnit,
    price,
    pricepergigabyte,
    maxSpeed,
  },
}) => (
  <TableRow>
    <TableCell>{isp}</TableCell>
    <TableCell>{`${dataVolume}${dataUnit}`}</TableCell>
    <TableCell><Price value={{ price, priceCurrency: 'UGX' }} /></TableCell>
    <TableCell><Price value={{ price: pricepergigabyte, priceCurrency: 'UGX' }} /></TableCell>
    <TableCell>{`${maxSpeed}Mbps`}</TableCell>
    <TableCell>Dataplan</TableCell>
    <TableCell>Dataplan</TableCell>
  </TableRow>
);
Dataplan.propTypes = {
  plan: PropTypes.shape({
    isp: PropTypes.string.isRequired,
  }).isRequired,
};
export default Dataplan;
