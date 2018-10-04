import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import groupBy from 'lodash/groupBy';
import ISP from './isp';

const ISPs = ({ dataplans }) => {
  const groupedByIsps = groupBy(dataplans, 'isp');

  return (
    <Fragment>
      {
        Object.keys(groupedByIsps).map((isp) => {
          const key = isp;
          return <ISP key={key} isp={isp} />;
        })
      }
    </Fragment>
  );
};

ISPs.propTypes = {
  dataplans: PropTypes.arrayOf(PropTypes.shape({
    isp: PropTypes.string,
  })),
};
ISPs.defaultProps = {
  dataplans: [],
};

export default ISPs;
