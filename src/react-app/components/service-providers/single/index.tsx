import React, {
  useState, useEffect, useContext, useLayoutEffect,
} from 'react';
import {
  createStyles, withStyles, Card,
  ListItemText, Collapse, Fade, Avatar, Typography,
} from '@material-ui/core';
import ChevronLeft from '@material-ui/icons/ChevronLeft';
import Li from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { DBContext } from '../../../../db';
import { Service } from '../../../../db/interface';
import DetailCard from '../../view-widgets/detail-card';

const style = createStyles({
  image: {
    width: '100%',
    objectFit: 'contain',
  },
  description: {
    paddingTop: '0px',
  },
  main: {
    marginBottom: '8px',
  },
  cards: {
    margin: '1px 0',
  },
});
interface Proptypes {
  providerId: string;
  showServices?: boolean;
  showPlans?: boolean;
  serviceId?: string;
  classes: any;
}

const ListItem = (props: any) => <Li button component={Link} {...props} />;

const ProviderPage = ({
  providerId, serviceId, classes, showServices, showPlans,
}: Proptypes) => {
  const { getServiceProviderById, getProviderServices, getServiceById } = useContext(DBContext);
  const [provider, setProvider] = useState();
  const [services, setServices] = useState();
  const [service, setService] = useState();

  useEffect(() => {
    getServiceProviderById(providerId).then((result) => {
      setProvider(result);
    });
  }, [providerId, getServiceProviderById]);

  useEffect(() => {
    if (serviceId) {
      getServiceById(serviceId).then((result) => {
        setService(result);
      });
    } else setService(undefined);
  }, [providerId, serviceId, getServiceById]);

  useEffect(() => {
    if (showServices) {
      getProviderServices(providerId).then((result) => {
        setServices(result);
      });
    } else setServices([]);
  }, [providerId, showServices, getProviderServices]);

  useLayoutEffect(() => {
    if (provider) {
      document.title = `${provider.name}${showServices ? ' Services' : ''}`;
    }
    if (service && provider) {
      document.title = `${service.name} by ${provider.name}`;
    }
  }, [provider, service, showServices]);

  return (
    <>
      <Collapse in={!!service} mountOnEnter unmountOnExit>
        <ListItem data-testid="services-link" button={false} to={`/providers/${providerId}/services`}>
          <ChevronLeft />
          <ListItemText primary="Services" secondary={provider && provider.name} />
        </ListItem>
      </Collapse>
      <Collapse in={!showServices} mountOnEnter unmountOnExit>
        {(service || provider) && <DetailCard thing={service || provider} />}
      </Collapse>
      <Fade in={showServices} mountOnEnter unmountOnExit>
        <Card className={classes.cards}>
          {provider && (
            <ListItem data-testid="provider-link" to={`/providers/${provider.id}`}>
              <ChevronLeft />
              <Avatar src={provider.logo}>{provider.name[0]}</Avatar>
              <ListItemText primary={provider.name} />
            </ListItem>
          )}
        </Card>
      </Fade>
      <Card className={classes.cards}>
        {provider && !service && (
          <ListItem data-testid="services-link" button={false} to={`/providers/${provider.id}/services`}>
            <Typography variant={showServices ? 'h6' : 'subtitle1'}>Services</Typography>
          </ListItem>
        )}
        {service && (
          <ListItem data-testid="plans-link" button={false} to={`/providers/${providerId}/services/${serviceId}/plans`}>
            <Typography variant="subtitle1">Plans</Typography>
          </ListItem>
        )}
        {
          services && services.map((({ id, name, logo }: Service) => (
            <ListItem
              key={id}
              data-testid="service-link"
              to={`/providers/${providerId}/services/${id}`}
            >
              {logo && <Avatar src={logo} />}
              <ListItemText primary={name} />
            </ListItem>
          )))
        }
      </Card>
    </>
  );
};

export default withStyles(style)(ProviderPage);
