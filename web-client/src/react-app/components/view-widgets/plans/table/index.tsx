import React, { useContext, useState, useEffect } from 'react';
import {
  createStyles, withStyles, TableBody, Table, TableRow, TableCell, Paper,
} from '@material-ui/core';
import { DBContext } from '../../../../../db';
import { Plan } from '../../../../../db/interface';
import formatPrice from '../../detail-card/price';

const style = createStyles({
  cell: {
    whiteSpace: 'pre',
  },
  name: {},
  duration: {},
  volume: {},
  price: {},
});

const PlanRow = ({ classes, plan }: { plan: Plan; classes: any }) => {
  const {
    name, duration, volume, price,
  } = plan;
  return (
    <TableRow role="row" hover>
      <TableCell className={`${classes.name} ${classes.cell}`} padding="dense">{name}</TableCell>
      <TableCell className={`${classes.duration} ${classes.cell}`} padding="dense">
        {`${duration.value} ${duration.unit}`}
      </TableCell>
      <TableCell className={`${classes.volume} ${classes.cell}`} padding="dense">
        {`${volume.unit === 'Unlimited' ? '' : volume.value} ${volume.unit}`}
      </TableCell>
      <TableCell className={`${classes.price} ${classes.cell}`} padding="dense">
        {formatPrice(price)}
      </TableCell>
    </TableRow>
  );
};

const PlansTable = ({ classes }: { classes: any }) => {
  const { getPlans } = useContext(DBContext);
  const [plans, setPlans] = useState();
  useEffect(() => {
    getPlans().then((result) => {
      setPlans(result);
    });
  }, [getPlans]);
  return (
    <Paper>
      <Table role="table" padding="dense">

        <TableBody>
          {(plans || []).map((plan: Plan) => {
            const key = `${plan.providerId}/${plan.serviceId}/${plan.id}`;
            return <PlanRow classes={classes} key={key} plan={plan} />;
          })}
        </TableBody>

      </Table>
    </Paper>
  );
};

export default withStyles(style)(PlansTable);
