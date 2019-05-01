import React, {
  useState, useEffect, useContext, useLayoutEffect,
} from 'react';
import {
  createStyles, withStyles, Card, CardHeader, CardContent, ListItem, ListItemText,
} from '@material-ui/core';
import { Link } from 'react-router-dom';
import { DBContext } from '../../../../db';

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
});
interface Proptypes {
  id: string;
  classes: any;
}

const PListItem = (props: any) => <ListItem button component={Link} {...props} />;

const ProviderPage = ({ id, classes }: Proptypes) => {
  const { getServiceProviderById } = useContext(DBContext);
  const [provider, setProvider] = useState();
  useEffect(() => {
    getServiceProviderById(id).then((result) => {
      setProvider(result);
    });
  }, [id, getServiceProviderById]);

  useLayoutEffect(() => { if (provider) document.title = provider.name; }, [provider]);

  return (
    <div>
      <Card className={classes.main}>
        <img className={classes.image} role="banner" src={provider && provider.banner} alt="" />
        <CardHeader role="heading" title={provider && provider.name} />
        <CardContent className={classes.description} role="contentinfo">
          {provider && provider.description}
        </CardContent>
      </Card>
      <Card>
        {provider && (
          <PListItem data-testid="services-link" to={`/providers/${provider.id}/services`}>
            <ListItemText primary="Services" />
          </PListItem>
        )}
      </Card>
    </div>
  );
};

export default withStyles(style)(ProviderPage);
