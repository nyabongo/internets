import React, {
  useState, useEffect, useContext, useLayoutEffect,
} from 'react';
import {
  createStyles, withStyles, Card,
  ListItemText, Collapse, Avatar, Typography,
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
  planId?: string;
  classes: any;
}

const ListItem = (props: any) => <Li button component={Link} {...props} />;

const ProviderPage = ({
  providerId, serviceId, planId, classes, showServices, showPlans,
}: Proptypes) => {
  const {
    getServiceProviderById, getProviderServices, getServiceById, getPlanById,
  } = useContext(DBContext);
  const [provider, setProvider] = useState();
  const [service, setService] = useState();
  const [plan, setPlan] = useState();
  const [services, setServices] = useState();

  useEffect(() => {
    getServiceProviderById(providerId).then((result) => {
      setProvider(result);
    });
  }, [providerId, getServiceProviderById]);

  useEffect(() => {
    if (serviceId) {
      getServiceById(serviceId, providerId).then((result) => {
        setService(result);
      });
    } else setService(undefined);
  }, [providerId, serviceId, getServiceById]);

  useEffect(() => {
    if (planId) {
      getPlanById(planId, serviceId, providerId).then((result) => {
        setPlan(result);
      });
    } else setPlan(undefined);
  }, [providerId, serviceId, planId, getPlanById]);

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
    if (service && provider && showPlans) {
      document.title = `Plans from ${service.name} by ${provider.name}`;
    }
    if (service && provider && plan) {
      document.title = `${plan.name} from ${provider.name}`;
    }
  }, [provider, service, plan, showPlans, showServices]);

  return (
    <>
      <Collapse in={!!service && !plan && !showPlans} mountOnEnter unmountOnExit>
        <Card style={{ marginBottom: '2px' }}>
          <ListItem data-testid="services-link" button={false} to={`/providers/${providerId}/services`}>
            <ChevronLeft />
            <ListItemText primary="Services" secondary={provider && provider.name} />
          </ListItem>
        </Card>
      </Collapse>
      <Collapse in={plan && !showPlans} mountOnEnter unmountOnExit>
        <Card style={{ marginBottom: '2px' }}>
          <ListItem data-testid="plans-link" button={false} to={`/providers/${providerId}/services/${serviceId}/plans`}>
            <ChevronLeft />
            <ListItemText primary="Plans" secondary={`${service && service.name} by ${provider && provider.name}`} />
          </ListItem>
        </Card>
      </Collapse>
      <Collapse in={!showServices && !showPlans} mountOnEnter unmountOnExit>
        {(plan || service || provider) && <DetailCard thing={plan || service || provider} />}
      </Collapse>
      <Collapse in={showServices || showPlans} mountOnEnter unmountOnExit>
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
      </Collapse>
      <Card className={classes.cards}>
        {provider && !service && (
          <ListItem data-testid="services-link" button={false} to={`/providers/${provider.id}/services`}>
            <Typography variant={showServices ? 'h6' : 'subtitle1'}>Services</Typography>
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
      </Card>
    </>
  );
};

export default withStyles(style)(ProviderPage);
