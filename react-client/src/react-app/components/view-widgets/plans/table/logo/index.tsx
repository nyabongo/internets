import React, { useContext, useState, useEffect } from 'react';
import { DBContext } from '../../../../../../db';

const Logo = ({ providerId, className }: {providerId: string;className?: string}) => {
  const { getServiceProviderById } = useContext(DBContext);
  const [provider, setProvider] = useState();
  useEffect(() => {
    getServiceProviderById(providerId).then((result) => {
      setProvider(result);
    });
  });
  return provider && provider.logo ? <img className={className} src={provider.logo} alt="logo" /> : null;
};

export default Logo;
