import React from 'react';
import {
  Card, CardHeader, CardContent, withStyles, createStyles,
} from '@material-ui/core';
import { Thing } from '../../../../db/interface';

const style = createStyles({
  image: {
    width: '100%',
    objectFit: 'contain',
  },
  description: {
    paddingTop: '0px',
  },
});

interface Proptypes {
  thing: Thing;
  classes: any;
}


function DetailCard({ classes, thing }: Proptypes) {
  return (
    <Card data-testid="thing-detail" className={classes.main}>
      <img className={classes.image} role="banner" src={thing && thing.banner} alt="" />
      <CardHeader role="heading" title={thing && thing.name} />
      <CardContent className={classes.description} role="contentinfo">
        {thing && thing.description}
      </CardContent>
    </Card>
  );
}


export default withStyles(style)(DetailCard);
