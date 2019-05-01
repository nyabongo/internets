import React, {
  useState, useEffect, useContext, useLayoutEffect,
} from 'react';
import {
  createStyles, withStyles, Card, CardHeader, CardContent,
} from '@material-ui/core';
import { DBContext } from '../../../../db';

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
  id: string;
  classes: any;
}
const ProviderPage = ({ id, classes }: Proptypes) => {
  const { getServiceProviderById } = useContext(DBContext);
  const [provider, setProvider] = useState();
  useEffect(() => {
    getServiceProviderById(id).then((result) => {
      setProvider(result);
    });
  }, [id, getServiceProviderById]);

  useLayoutEffect(() => {
    if (provider) {
      document.title = provider.name;
    }
  }, [provider]);
  return (
    <div>
      <Card>
        <img className={classes.image} role="banner" src={provider && provider.banner} alt="" />
        <CardHeader role="heading" title={provider && provider.name} />
        <CardContent className={classes.description} role="contentinfo">
          {provider && provider.description}
        </CardContent>
      </Card>
    </div>
  );
};

export default withStyles(style)(ProviderPage);
