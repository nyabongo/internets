import React, {
  useContext, useState, Fragment, useEffect,
} from 'react';
import {
  ListItem, ListItemAvatar, Avatar, ListItemText, Card, Divider, Collapse, List, CardHeader,
} from '@material-ui/core';
import { DBContext } from '../../../../db';
import { ServiceProvider, Service } from '../../../../db/interface';
import filterContext from '../../../../db/filter';

export const ServicesNav = ({ providerId }: {providerId: string}) => {
  const { getProviderServices } = useContext(DBContext);
  const [services, setServices] = useState();
  useEffect(() => {
    getProviderServices(providerId).then((result) => {
      setServices(result);
    });
  }, [providerId, getProviderServices]);
  const filter = useContext(filterContext);
  return (
    <List data-testid={`services-for-${providerId}`} component="section">
      {(services || []).map(({ name, id }: Service) => (
        <Fragment key={`${providerId}/${id}`}>
          <ListItem
            button
            data-testid={`service-${id}`}
            onClick={() => {
              filter.dispatch({ provider: providerId, service: id });
            }}
          >
            <ListItemText inset secondary={name} />
          </ListItem>
        </Fragment>
      ))}
    </List>
  );
};

const ProvidersNav = () => {
  const { getServiceProviders } = useContext(DBContext);
  const filter = useContext(filterContext);
  const [provider, selectProvider] = useState('');
  const [providers, setProviders] = useState();
  useEffect(() => {
    getServiceProviders().then((results) => {
      setProviders(results);
    });
  });
  return (
    <Card>
      <CardHeader title="ISPs and Services" />
      <Divider />
      {(providers || []).map(({ logo, name, id }: ServiceProvider) => (
        <Fragment key={id}>
          <ListItem
            button
            data-testid={`provider-${id}`}
            onClick={() => {
              selectProvider(id);
              filter.dispatch({ provider: id, service: '' });
            }}
          >
            <ListItemAvatar>
              <Avatar alt={name} src={logo} />
            </ListItemAvatar>
            <ListItemText primary={name} />
          </ListItem>
          <Collapse in={provider === id} timeout="auto" unmountOnExit>
            <ServicesNav providerId={id} />
          </Collapse>
          <Divider />
        </Fragment>
      ))}
    </Card>
  );
};

export default ProvidersNav;
