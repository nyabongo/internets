import React from 'react';
import PropTypes from 'prop-types';

const ISPs = ({ dataplans }) => (
  <div>
      ISPS here
  </div>
);

ISPs.propTypes = {
  dataplans: PropTypes.arrayOf(PropTypes.shape({
    isp: PropTypes.string,
  })),
};
ISPs.defaultProps = {
  dataplans: [],
};

export default ISPs;
