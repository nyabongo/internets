import React, { Fragment } from 'react';
import withStateHandlers from 'recompose/withStateHandlers';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import ISP from './isp';

const ISPs = ({ dataplans, onSelect }) => {
  const groupedByIsps = groupBy(dataplans, 'isp');

  return (
    <Fragment>
      {
        Object.keys(groupedByIsps).map((isp) => {
          const key = isp;
          return (
            <ISP
              key={key}
              isp={isp}
              onSelect={() => onSelect(isp)}
            />
          );
        })
      }
    </Fragment>
  );
};

ISPs.propTypes = {
  dataplans: PropTypes.arrayOf(PropTypes.shape({
    isp: PropTypes.string,
  })),
  onSelect: PropTypes.func.isRequired,
};
ISPs.defaultProps = {
  dataplans: [],
};

const getPredicate = allowed => (val) => {
  if (allowed.size === 0) return true;
  return val && val.isp && allowed.has(val.isp);
};

export default withStateHandlers(
  { selected: [] }, {
    onSelect: ({ selected }, { updateFilters }) => (isp) => {
      const update = new Set(selected);
      if (update.has(isp)) {
        update.delete(isp);
      } else {
        update.add(isp);
      }

      updateFilters(isp, getPredicate(update));
      return { selected: [...update] };
    },
  },
)(ISPs);
