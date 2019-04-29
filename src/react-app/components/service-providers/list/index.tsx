import React, { useContext, useState, useEffect } from 'react';
import { DBContext } from '../../../../db';
import ProviderCard from '../card';
import { ServiceProvider } from '../../../../db/interface';

const ServiceProviderList = () => {
  const { getServiceProviders } = useContext(DBContext);
  const [providers, setProviders] = useState([]);
  useEffect(() => {
    getServiceProviders().then((result) => {
      setProviders(result);
    });
  }, [getServiceProviders]);
  return (
    <div>
      Service Provider List
      {providers.map((provider: ServiceProvider) => (
        <ProviderCard
          key={provider.id}
          provider={provider}
        />
      ))}
    </div>
  );
};

export default ServiceProviderList;
