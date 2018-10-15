import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const ISP = ({ isp, onSelect }) => (
  <ListItem onClick={onSelect} button>
    <ListItemText primary={isp} />
  </ListItem>
);

ISP.propTypes = {
  isp: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default ISP;
