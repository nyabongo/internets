import React from 'react';
import { ServiceProvider } from '../../../../db/interface';


const ProviderCard = ({ provider }: {provider: ServiceProvider}) => (
  <pre>
    {JSON.stringify(provider, null, 2)}
  </pre>
);

export default ProviderCard;
