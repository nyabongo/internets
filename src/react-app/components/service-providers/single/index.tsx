import React from 'react';

interface Proptypes {
  id: string;
}
const ProviderPage = ({ id }: Proptypes) => (
  <div>
    {id}
  </div>
);

export default ProviderPage;
