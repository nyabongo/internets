import compose from 'recompose/compose';
import withState from 'recompose/withState';

export default compose(
  withState('currency', 'setCurrency', 'UGX'),
);
