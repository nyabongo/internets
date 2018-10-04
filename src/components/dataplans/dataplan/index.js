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
    serviceDuration, durationUnit,
    technology,
  },
}) => (
  <TableRow component="div" hover>
    <TableCell component="div">{isp}</TableCell>
    <TableCell component="div">{`${dataVolume}${dataUnit}`}</TableCell>
    <TableCell component="div"><Price value={{ price, priceCurrency: 'UGX' }} /></TableCell>
    <TableCell component="div"><Price value={{ price: pricepergigabyte, priceCurrency: 'UGX' }} /></TableCell>
    <TableCell component="div">{`${maxSpeed}Mbps`}</TableCell>
    <TableCell component="div">{`${serviceDuration} ${durationUnit}`}</TableCell>
    <TableCell component="div">{technology}</TableCell>
  </TableRow>
);
Dataplan.propTypes = {
  plan: PropTypes.shape({
    isp: PropTypes.string.isRequired,
  }).isRequired,
};
export default Dataplan;
