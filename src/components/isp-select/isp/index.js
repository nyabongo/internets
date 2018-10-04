import React from 'react';
import PropTypes from 'prop-types';

const ISP = ({ isp }) => (
  <div>
    {isp}
  </div>
);

ISP.propTypes = {
  isp: PropTypes.string.isRequired,
};

export default ISP;
