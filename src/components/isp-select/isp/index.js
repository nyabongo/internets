import React from 'react';
import PropTypes from 'prop-types';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import CheckIcon from '@material-ui/icons/Check';

const ISP = ({ isp, onSelect, selected }) => (
  <ListItem
    onClick={onSelect}
    button
    disableGutters
  >
    <ListItemText style={{ paddingLeft: 4 }} primary={isp} />
    {selected && (
    <ListItemIcon>
      <CheckIcon />
    </ListItemIcon>
    )}
  </ListItem>
);

ISP.propTypes = {
  isp: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  selected: PropTypes.bool.isRequired,
};

export default ISP;
