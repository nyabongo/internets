import compose from 'recompose/compose';
import withStateHandlers from 'recompose/withStateHandlers';
import filter from 'lodash/filter';

export default compose(
  withStateHandlers(
    ({ dataplans }) => ({ filters: {}, dataplans }),
    {
      updateFilters: ({ filters }, { dataplans }) => (label, predicate) => {
        const update = { [label]: predicate };
        const newFilters = { ...filters, ...update };
        let filtered = [...dataplans];
        Object.keys(newFilters).forEach((key) => {
          filtered = filter(filtered, newFilters[key]);
        });

        return { filters: newFilters, dataplans: filtered };
      },
    },
  ),
);
