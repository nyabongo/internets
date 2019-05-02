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
import { Service, Plan } from '../../../../db/interface';
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
  planId?: string;
  classes: any;
}

const ListItem = (props: any) => <Li button component={Link} {...props} />;

const ProviderPage = ({
  providerId, serviceId, classes, showServices, showPlans,
}: Proptypes) => {
  const {
    getServiceProviderById, getProviderServices, getServiceById, getServicePlans,
  } = useContext(DBContext);
  const [provider, setProvider] = useState();
  const [services, setServices] = useState();
  const [plans, setPlans] = useState();
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

  useEffect(() => {
    if (showPlans && serviceId) {
      getServicePlans(serviceId, providerId).then((result) => {
        setPlans(result);
      });
    } else setPlans([]);
  }, [providerId, serviceId, showPlans, getServicePlans]);


  useLayoutEffect(() => {
    if (provider) {
      document.title = `${provider.name}${showServices ? ' Services' : ''}`;
    }
    if (service && provider) {
      document.title = `${service.name} by ${provider.name}`;
    }
    if (service && provider && showPlans) {
      document.title = `Plans from ${service.name} by ${provider.name}`;
    }
  }, [provider, service, showPlans, showServices]);

  return (
    <>
      <Collapse in={!!service && !showPlans} mountOnEnter unmountOnExit>
        <ListItem data-testid="services-link" button={false} to={`/providers/${providerId}/services`}>
          <ChevronLeft />
          <ListItemText primary="Services" secondary={provider && provider.name} />
        </ListItem>
      </Collapse>
      <Collapse in={!showServices && !showPlans} mountOnEnter unmountOnExit>
        {(service || provider) && <DetailCard thing={service || provider} />}
      </Collapse>
      <Fade in={showServices || showPlans} mountOnEnter unmountOnExit>
        <Card className={classes.cards}>
          {provider && !service && (
            <ListItem data-testid="provider-link" to={`/providers/${provider.id}`}>
              <ChevronLeft />
              <Avatar src={provider.logo}>{provider.name[0]}</Avatar>
              <ListItemText primary={provider.name} />
            </ListItem>
          )}
          {service && provider && (
            <ListItem data-testid="service-link" to={`/providers/${provider.id}/services/${service.id}`}>
              <ChevronLeft />
              <ListItemText primary={service.name} secondary={provider.name} />
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
          services && services.map((({ id, name }: Service) => (
            <ListItem
              key={id}
              data-testid="service-link"
              to={`/providers/${providerId}/services/${id}`}
            >
              <ListItemText primary={name} />
            </ListItem>
          )))
        }
        {
          plans && plans.map((({ id, name }: Plan) => (
            <ListItem
              key={id}
              data-testid="plan-link"
              to={`/providers/${providerId}/services/${serviceId}/plans/${id}`}
            >
              <ListItemText secondary={name} />
            </ListItem>
          )))
        }
      </Card>
    </>
  );
};

export default withStyles(style)(ProviderPage);
