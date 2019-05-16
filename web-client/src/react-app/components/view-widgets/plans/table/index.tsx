import React, { useContext, useState, useEffect } from 'react';
import {
  createStyles, withStyles, TableBody, Table,
  TableRow, TableCell, Paper, TableHead, Divider, Dialog,
} from '@material-ui/core';
import { DBContext } from '../../../../../db';
import { Plan } from '../../../../../db/interface';
import formatPrice from '../../detail-card/price';
import filterContext from '../../../../../db/filter';
import HeaderDetail from './header-detail';
import Logo from './logo';
import DetailCard from '../../detail-card';

const style = createStyles({
  row: {
    textDecoration: 'none',
  },
  cell: {
    whiteSpace: 'pre',
  },
  name: {
    '&> span': {
      display: 'flex',
      alignItems: 'center',
    },
  },
  duration: {},
  volume: {},
  price: {},
  logo: {
    width: '32px',
    height: '32px',
    marginRight: '16px',
  },
});

const RowItem = (props: any) => <TableRow {...props} />;
const Cell = (props: any) => <TableCell component="span" {...props} />;
const PlanRow = ({ classes, plan, ...props }: { plan: Plan; classes: any; onClick: () => any }) => {
  const {
    name, duration, volume, price, providerId,
  } = plan;
  return (
    <RowItem
      role="row"
      className={classes.row}
      hover
      data-testid="plan-link"
      {...props}
    >
      <Cell className={`${classes.name} ${classes.cell}`} padding="dense">
        <span>
          <Logo className={classes.logo} providerId={providerId} />
          {name}
        </span>
      </Cell>
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
const PlanDialog = ({ plan, close }: {plan: Plan;close: any}) => {
  if (!plan) return null;
  return (
    <Dialog role="dialog" open={!!plan} onClose={close}>
      <DetailCard thing={plan} />
    </Dialog>
  );
};

const PlansTable = ({ classes }: { classes: any }) => {
  const { getPlans } = useContext(DBContext);
  const [selectedPlan, selectPlan] = useState();
  const [plans, setPlans] = useState();
  const { filterPlans } = useContext(filterContext);
  useEffect(() => {
    getPlans().then((result) => {
      setPlans(result);
    });
  }, [getPlans]);

  const filteredPlans = filterPlans(plans || []);
  return (
    <>
      <PlanDialog plan={selectedPlan} close={() => { selectPlan(null); }} />
      <Paper>
        <HeaderDetail />
        <Divider />
        <Table role="table" component="div" padding="dense">
          <Header classes={classes} />
          <TableBody component="div">
            {(filteredPlans || []).map((plan: Plan) => {
              const key = `${plan.providerId}/${plan.serviceId}/${plan.id}`;
              return (
                <PlanRow
                  classes={classes}
                  key={key}
                  plan={plan}
                  onClick={() => { selectPlan(plan); }}
                />
              );
            })}
          </TableBody>

        </Table>
      </Paper>
    </>
  );
};

export default withStyles(style)(PlansTable);
