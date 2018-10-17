import React, { Fragment } from 'react';
import withStateHandlers from 'recompose/withStateHandlers';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import ISP from './isp';

const ISPs = ({
  onSelect, selected, isps,
}) => (
  <Fragment>
    {
      Object.keys(isps).map((isp) => {
        const key = isp;
        return (
          <ISP
            selected={selected.includes(isp)}
            key={key}
            isp={isp}
            onSelect={() => onSelect(isp)}
          />
        );
      })
      }
  </Fragment>
);

ISPs.propTypes = {
  isps: PropTypes.shape({}).isRequired,
  selected: PropTypes.arrayOf(PropTypes.string).isRequired,
  onSelect: PropTypes.func.isRequired,
};

const getPredicate = allowed => (val) => {
  if (allowed.size === 0) return true;
  return val && val.isp && allowed.has(val.isp);
};

export default withStateHandlers(
  ({ dataplans }) => ({ selected: [], isps: groupBy(dataplans, 'isp') }),
  {
    onSelect: ({ selected }, { updateFilters }) => (isp) => {
      const update = new Set(selected);
      if (update.has(isp)) {
        update.delete(isp);
      } else {
        update.add(isp);
      }

      updateFilters('isp_filter', getPredicate(update));
      return { selected: [...update] };
    },
  },
)(ISPs);
