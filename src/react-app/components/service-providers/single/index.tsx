import React, {
  useState, useEffect, useContext, useLayoutEffect,
} from 'react';
import {
  createStyles, withStyles, Card, CardHeader, CardContent,
  ListItemText, Collapse, Fade, Avatar, Typography,
} from '@material-ui/core';
import Li from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import { DBContext } from '../../../../db';
import { Service } from '../../../../db/interface';

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
  classes: any;
}

const ListItem = (props: any) => <Li button component={Link} {...props} />;

const ProviderPage = ({ providerId, classes, showServices }: Proptypes) => {
  const { getServiceProviderById, getProviderServices } = useContext(DBContext);
  const [provider, setProvider] = useState();
  const [services, setServices] = useState();

  useEffect(() => {
    getServiceProviderById(providerId).then((result) => {
      setProvider(result);
    });
  }, [providerId, getServiceProviderById]);

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
  }, [provider, showServices]);

  return (
    <>
      <Collapse in={!showServices} mountOnEnter unmountOnExit>
        <Card data-testid="provider-detail" className={classes.main}>
          <img className={classes.image} role="banner" src={provider && provider.banner} alt="" />
          <CardHeader role="heading" title={provider && provider.name} />
          <CardContent className={classes.description} role="contentinfo">
            {provider && provider.description}
          </CardContent>
        </Card>
      </Collapse>
      <Fade in={showServices} mountOnEnter unmountOnExit>
        <Card className={classes.cards}>
          {provider && (
            <ListItem data-testid="provider-link" to={`/providers/${provider.id}`}>
              <Avatar src={provider.logo} />
              <ListItemText primary={provider.name} />
            </ListItem>
          )}
        </Card>
      </Fade>
      <Card className={classes.cards}>
        {provider && (
          <ListItem data-testid="services-link" button={false} to={`/providers/${provider.id}/services`}>
            <Typography variant={showServices ? 'h6' : 'subtitle1'}>Services</Typography>
          </ListItem>
        )}
        {
          services && services.map(((service: Service) => (
            <ListItem
              key={service.id}
              data-testid="service-link"
              to={`/providers/${providerId}/services/${service.id}`}
            >
              {service.logo && <Avatar src={service.logo} />}
              <ListItemText primary={service.name} />
            </ListItem>
          )))
        }
      </Card>
    </>
  );
};

export default withStyles(style)(ProviderPage);
