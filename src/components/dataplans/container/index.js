import compose from 'recompose/compose';
import withState from 'recompose/withState';
import withProps from 'recompose/withProps';
import orderBy from 'lodash/orderBy';

export default compose(
  withState('order', 'setOrder', 'isp'),
  withProps(({ dataplans, order }) => ({
    dataplans: orderBy(dataplans, order),
  })),
);
