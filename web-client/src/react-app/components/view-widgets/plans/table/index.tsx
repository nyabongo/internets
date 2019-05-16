import React, { useContext, useState, useEffect } from 'react';
import {
  createStyles, withStyles, TableBody, Table, TableRow, TableCell, Paper, TableHead,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { DBContext } from '../../../../../db';
import { Plan } from '../../../../../db/interface';
import formatPrice from '../../detail-card/price';
import filterContext from '../../../../../db/filter';

const style = createStyles({
  row: {
    textDecoration: 'none',
  },
  cell: {
    whiteSpace: 'pre',
  },
  name: {},
  duration: {},
  volume: {},
  price: {},
});

const RowItem = (props: any) => <TableRow component={Link} {...props} />;
const Cell = (props: any) => <TableCell component="span" {...props} />;
const PlanRow = ({ classes, plan }: { plan: Plan; classes: any }) => {
  const {
    name, duration, volume, price, providerId, serviceId, id,
  } = plan;
  return (
    <RowItem
      role="row"
      className={classes.row}
      hover
      to={`/providers/${providerId}/services/${serviceId}/plans/${id}`}
      data-testid="plan-link"
    >
      <Cell className={`${classes.name} ${classes.cell}`} padding="dense">{name}</Cell>
      <Cell className={`${classes.duration} ${classes.cell}`} padding="dense">
        {`${duration.value} ${duration.unit}`}
      </Cell>
      <Cell className={`${classes.volume} ${classes.cell}`} padding="dense">
        {`${volume.unit === 'Unlimited' ? '' : volume.value} ${volume.unit}`}
      </Cell>
      <Cell className={`${classes.price} ${classes.cell}`} padding="dense">
        {formatPrice(price)}
      </Cell>
    </RowItem>
  );
};

const Header = ({ classes }: { classes: any }) => (
  <TableHead>
    <TableRow>
      <Cell className={`${classes.name} ${classes.cell}`}>Name</Cell>
      <Cell className={`${classes.duration} ${classes.cell}`}>Duration</Cell>
      <Cell className={`${classes.volume} ${classes.cell}`}>Volume</Cell>
      <Cell className={`${classes.price} ${classes.cell}`}>Price</Cell>
    </TableRow>
  </TableHead>
);

const PlansTable = ({ classes }: { classes: any }) => {
  const { getPlans } = useContext(DBContext);
  const [plans, setPlans] = useState();
  const { filterPlans } = useContext(filterContext);
  useEffect(() => {
    getPlans().then((result) => {
      setPlans(result);
    });
  }, [getPlans]);

  const filteredPlans = filterPlans(plans || []);
  return (
    <Paper>
      <Table role="table" component="div" padding="dense">
        <Header classes={classes} />
        <TableBody component="div">
          {(filteredPlans || []).map((plan: Plan) => {
            const key = `${plan.providerId}/${plan.serviceId}/${plan.id}`;
            return <PlanRow classes={classes} key={key} plan={plan} />;
          })}
        </TableBody>

      </Table>
    </Paper>
  );
};

export default withStyles(style)(PlansTable);
