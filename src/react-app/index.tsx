import React, { useState, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './components/home-page';
import PageRouter from './components/page-router';
import ServiceProviderList from './components/service-providers/list';
import ProviderPage from './components/service-providers/single';
import ProviderServices from './components/provider-services/list';

export interface View {
  showPage: (pageName: string, params?: {providerId: string}) => void;
}

const App = () => {
  const [page, setPage] = useState('');
  const [provider, setProvider] = useState('');
  const view: View = {
    showPage: (pageName: string, params?: {providerId: string}) => {
      setPage(pageName);
      if (params && params.providerId) { setProvider(params.providerId); }
    },
  };

  return (
    <BrowserRouter>
      <Fragment>
        <PageRouter view={view} />
        {page === 'home' && <HomePage />}
        {page === 'providers' && <ServiceProviderList />}
        {page === 'provider' && <ProviderPage id={provider} />}
        {page === 'services' && <ProviderServices providerId={provider} />}
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
