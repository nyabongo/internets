import React from 'react';
import compose from 'recompose/compose';
import withStateHandlers from 'recompose/withStateHandlers';
import filter from 'lodash/filter';

const runFilters = C => ({ dataplans, filters, ...props }) => {
  let filtered = [...dataplans];
  Object.keys(filters).forEach((key) => {
    filtered = filter(filtered, filters[key]);
  });
  return <C {...props} filters={filters} dataplans={filtered} />;
};

export default compose(
  withStateHandlers(
    () => ({ filters: {} }),
    {
      updateFilters: ({ filters }) => (label, predicate) => {
        const update = { [label]: predicate };
        const newFilters = { ...filters, ...update };
        return { filters: newFilters };
      },
    },
  ),
  runFilters,
);
