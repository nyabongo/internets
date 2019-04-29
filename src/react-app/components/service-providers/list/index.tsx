import React, { useContext, useState, useEffect } from 'react';
import { createStyles, withStyles } from '@material-ui/core';
import { DBContext } from '../../../../db';
import { ServiceProvider } from '../../../../db/interface';
import Icon from '../../view-widgets/icon';

const styles = createStyles({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
});
const ServiceProviderList = ({ classes }: {classes: any}) => {
  const { getServiceProviders } = useContext(DBContext);
  const [providers, setProviders] = useState([]);
  useEffect(() => {
    getServiceProviders().then((result) => {
      setProviders(result);
    });
  }, [getServiceProviders]);
  return (
    <div className={classes.root}>
      {providers.map(({ id, logo, name }: ServiceProvider) => (
        <Icon
          key={id}
          imageURL={logo}
          title={name}
          target={`/providers/${id}`}
        />
      ))}
    </div>
  );
};

export default withStyles(styles)(ServiceProviderList);
