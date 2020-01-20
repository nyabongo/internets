import React, { useState, useContext, useEffect } from 'react';
import {
  Card, CardHeader, CardContent, withStyles, createStyles,
  Typography, TableBody, TableRow, TableCell, Table, Divider, Avatar,
} from '@material-ui/core';
import { Thing, Plan } from '../../../../db/interface';
import formatPrice from './price';
import { DBContext } from '../../../../db';

const style = createStyles({
  image: {
    width: '100%',
    objectFit: 'contain',
    display: 'block',
  },
  description: {
    paddingTop: '0px',
  },
  vectors: {
    '&:first-child': {
      marginLeft: '16px',
    },
    '&:last-child': {
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
  unit?: string;
  label?: string;
  pluralChar?: string;
  classes: any;
}
const Vector = withStyles(style)(({
  value, unit, label, pluralChar = '',
}: VectorProptypes) => (
  <TableRow>
    <TableCell>
      <Typography variant="caption">
        {label && label}
      </Typography>
    </TableCell>
    <TableCell>
      <Typography variant="body1">
        {`${value}${unit ? ` ${unit}` : ''}`}
        {value > 1 ? pluralChar : ''}
      </Typography>
    </TableCell>
  </TableRow>
));


function DetailCard({ classes, thing }: Proptypes) {
  const [provider, setProvider] = useState();
  const [service, setService] = useState();
  const db = useContext(DBContext);
  useEffect(() => {
    if (thing.providerId) {
      db.getServiceProviderById(thing.providerId).then((result) => {
        setProvider(result);
      });
    } else setProvider(null);

    if (thing.serviceId) {
      db.getServiceById(thing.serviceId, thing.providerId).then((result) => {
        setService(result);
      });
    } else setService(null);
  }, [thing, db]);

  const subheader = provider && `${provider.name} ${service && (` / ${service.name}`)}`;
  const logo = thing.logo || (service && service.logo) || (provider && provider.logo);
  return (
    <Card data-testid="thing-detail" className={classes.main}>
      <img className={classes.image} role="banner" src={thing && thing.banner} alt="" />
      <CardHeader
        avatar={logo && (<Avatar src={logo} />)}
        role="heading"
        title={thing && thing.name}
        subheader={subheader}
      />
      <Divider />
      {thing && thing.description && (
        <>
          <CardContent role="contentinfo">
            {thing.description}
          </CardContent>
          <Divider />
        </>
      )}
      <Table>
        <TableBody className={classes.vectors}>
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
            <Vector
              value={formatPrice(thing.price)}
              label="Price"
            />
          )}
        </TableBody>
      </Table>
    </Card>
  );
}


export default withStyles(style)(DetailCard);
