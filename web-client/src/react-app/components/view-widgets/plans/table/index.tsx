import React, { useContext, useState, useEffect } from 'react';
import {
  createStyles, withStyles, TableBody, Table,
  TableRow, TableCell, Paper, TableHead, Divider, Dialog, TableSortLabel,
} from '@material-ui/core';
import { DBContext } from '../../../../../db';
import { Plan } from '../../../../../db/interface';
import formatPrice from '../../detail-card/price';
import filterContext, { Filter } from '../../../../../db/filter';
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
      component="div"
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

const Header = ({ classes, filter }: { classes: any; filter: Filter }) => {
  const { dispatch } = filter;
  return (
    <TableHead component="div">
      <TableRow component="div">
        <Cell className={`${classes.name} ${classes.cell}`}>
          <TableSortLabel
            role="columnheader"
            active={filter.orderBy === 'name'}
            direction={filter.reverse ? 'asc' : 'desc'}
            onClick={() => dispatch({ orderBy: 'name' })}
          >
            Name
          </TableSortLabel>
        </Cell>
        <Cell className={`${classes.duration} ${classes.cell}`}>
          <TableSortLabel
            role="columnheader"
            active={filter.orderBy === 'duration'}
            direction={filter.reverse ? 'asc' : 'desc'}
            onClick={() => dispatch({ orderBy: 'duration' })}
          >
            Duration
          </TableSortLabel>
        </Cell>
        <Cell className={`${classes.volume} ${classes.cell}`}>
          <TableSortLabel
            role="columnheader"
            active={filter.orderBy === 'volume'}
            direction={filter.reverse ? 'asc' : 'desc'}
            onClick={() => dispatch({ orderBy: 'volume' })}
          >
            Volume
          </TableSortLabel>
        </Cell>
        <Cell className={`${classes.price} ${classes.cell}`}>
          <TableSortLabel
            role="columnheader"
            active={filter.orderBy === 'price'}
            direction={filter.reverse ? 'asc' : 'desc'}
            onClick={() => dispatch({ orderBy: 'price' })}
          >
            Price
          </TableSortLabel>
        </Cell>
      </TableRow>
    </TableHead>
  );
};
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
  const filter = useContext(filterContext);
  useEffect(() => {
    getPlans().then((result) => {
      setPlans(result);
    });
  }, [getPlans]);

  const filteredPlans = filter.filterPlans(plans || []);
  return (
    <>
      <PlanDialog plan={selectedPlan} close={() => { selectPlan(null); }} />
      <Paper>
        <HeaderDetail />
        <Divider />
        <Table role="table" component="div" padding="dense">
          <Header filter={filter} classes={classes} />
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
