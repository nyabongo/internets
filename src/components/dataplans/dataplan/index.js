import React from 'react';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import PropTypes from 'prop-types';

const Dataplan = ({
  plan: {
    isp, dataVolume,
    dataUnit,
  },
}) => (
  <TableRow>
    <TableCell>{isp}</TableCell>
    <TableCell>{`${dataVolume}${dataUnit}`}</TableCell>
    <TableCell>Dataplan</TableCell>
    <TableCell>Dataplan</TableCell>
    <TableCell>Dataplan</TableCell>
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
