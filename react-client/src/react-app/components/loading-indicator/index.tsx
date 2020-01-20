import React from 'react';
import { CircularProgress, withStyles, createStyles } from '@material-ui/core';

const styles = createStyles({
  wrapper: {
    padding: '32px',
    textAlign: 'center',
  },
  root: {
    width: '100%',
    height: '100%',
  },
});

const LoadingIndicator = ({ classes }: {classes: any}) => (
  <div className={classes.wrapper}>
    <CircularProgress />
  </div>
);

export default withStyles(styles)(LoadingIndicator);
