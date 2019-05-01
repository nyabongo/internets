import React from 'react';
import { createStyles, withStyles } from '@material-ui/core';

const style = createStyles({});

interface Proptypes {
  providerId: string;
  classes: any;
}

const ProviderServices = ({ providerId }: Proptypes) => (
  <div>
      Provider Services for
    {' '}
    {providerId}
  </div>
);

export default withStyles(style)(ProviderServices);
