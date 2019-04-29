import React from 'react';
import {
  Typography, withStyles, createStyles, Avatar, Card,
} from '@material-ui/core';
import { Link } from 'react-router-dom';

const style = createStyles({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '4px',
    textDecoration: 'none',
  },
  img: {
    display: 'block',
    height: '128px',
    width: '128px',
    objectFit: 'contain',
    backgroundColor: '#fafafa',
    borderRadius: '5%',
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
      elevation={0}
      className={classes.root}
      role="button"
    >
      <Avatar src={imageURL} className={classes.img} alt={title} />
      <Typography className={classes.title}>
        {title}
      </Typography>
    </Card>
  );
};

export default withStyles(style)(Icon);
