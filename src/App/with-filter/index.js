import compose from 'recompose/compose';
import withStateHandlers from 'recompose/withStateHandlers';

export default compose(
  withStateHandlers(
    { filters: {} }, {
      updateFilters: () => () => {},
    },
  ),
);
