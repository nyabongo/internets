import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import container from './container';
import Plan from './dataplan';
import TableHeaders from './table-headers';

const DataPlans = ({ dataplans }) => (
  <Table>
    <TableHeaders />
    <TableBody>
      {
        dataplans.map((plan, i) => {
          const key = `${plan.id}-${plan.isp}-${i}`;
          return <Plan plan={plan} key={key} />;
        })
      }
    </TableBody>
  </Table>
);
DataPlans.propTypes = {
  dataplans: PropTypes.arrayOf(PropTypes.object),
};
DataPlans.defaultProps = {
  dataplans: [],
};
export default container(DataPlans);
