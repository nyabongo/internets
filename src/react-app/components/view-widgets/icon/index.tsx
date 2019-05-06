import React from 'react';
import {
  Typography, withStyles, createStyles, Card,
} from '@material-ui/core';
import ErrorIcon from '@material-ui/icons/Error';
import { Link } from 'react-router-dom';

const style = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '4px',
    textDecoration: 'none',
    width: '160px',
  },
  img: {
    display: 'block',
    height: '160px',
    width: '160px',
    objectFit: 'contain',
    color: '#E0E0E0',
    backgroundColor: '#fafafa',
    borderRadius: '0%',
  },
  title: {
    padding: '8px',
    textAlign: 'center',
  },
});

interface Proptypes {
  title: string;
  imageURL: string;
  classes: any;
  target?: string;
}

const Icon = ({
  title, imageURL, target, classes,
}: Proptypes) => {
  const ItemLink = (props: any) => <Link to={target} {...props} />;
  return (
    <Card
      component={ItemLink}
      elevation={1}
      className={classes.root}
      role="button"
    >
      <object data={imageURL} className={classes.img} type="image/png">
        <ErrorIcon className={classes.img} />
      </object>
      <Typography className={classes.title}>
        {title}
      </Typography>
    </Card>
  );
};

export default withStyles(style)(Icon);
