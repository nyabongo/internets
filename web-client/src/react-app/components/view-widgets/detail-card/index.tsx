import React from 'react';
import {
  Card, CardHeader, CardContent, withStyles, createStyles, Typography,
} from '@material-ui/core';
import { Thing, Plan } from '../../../../db/interface';
import formatPrice from './price';

const style = createStyles({
  image: {
    width: '100%',
    objectFit: 'contain',
  },
  description: {
    paddingTop: '0px',
  },
  vectors: {
    display: 'flex',
    justifyContent: 'space-around',
    '&:first-child': {
      marginLeft: '16px',
    },
    '&:lasst-child': {
      marginRight: '16px',
    },
    '&> *': {
      marginBottom: '16px',
    },
  },
  vectorValue: {
    padding: '4px',
  },
  vectorUnit: {
    padding: '4px',
  },
  vectorContainer: {
    display: 'flex',
    alignItems: 'baseline',
  },
  label: {
    textAlign: 'center',
  },
});

interface Proptypes {
  thing: Thing | Plan;
  classes: any;
}
interface VectorProptypes {
  value: string | number;
  unit: string;
  label?: string;
  pluralChar?: string;
  classes: any;
}
const Vector = withStyles(style)(({
  value, unit, label, classes, pluralChar = '',
}: VectorProptypes) => (
  <div>
    <div className={classes.vectorContainer}>
      <Typography variant="h6" className={classes.vectorValue}>
        {value}
      </Typography>
      <Typography variant="subtitle1" className={classes.vectorUnit}>
        {unit}
        {value > 1 ? pluralChar : ''}
      </Typography>
    </div>
    <Typography variant="caption" className={classes.label}>
      {label && label}
    </Typography>
  </div>
));


function DetailCard({ classes, thing }: Proptypes) {
  return (
    <Card data-testid="thing-detail" className={classes.main}>
      <img className={classes.image} role="banner" src={thing && thing.banner} alt="" />
      <CardHeader role="heading" title={thing && thing.name} />
      <CardContent className={classes.description} role="contentinfo">
        {thing && thing.description}
      </CardContent>
      <div className={classes.vectors}>
        {thing.volume && (
          <Vector
            value={thing.volume.value}
            unit={thing.volume.unit}
            label="Volume"
          />
        )}
        {thing.duration && (
          <Vector
            value={thing.duration.value}
            unit={thing.duration.unit}
            pluralChar="s"
            label="Duration"
          />
        )}
        {thing.price && (
          <div>
            <Typography variant="h5" className={classes.vectorValue}>
              {formatPrice(thing.price)}
            </Typography>
            <Typography variant="caption" className={classes.label}>
              Price
            </Typography>
          </div>
        )}
      </div>
    </Card>
  );
}


export default withStyles(style)(DetailCard);
