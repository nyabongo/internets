import React, { useState, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './components/home-page';
import PageRouter from './components/page-router';
import ServiceProviderList from './components/service-providers/list';
import ProviderPage from './components/service-providers/single';

interface ParamTypes {
  providerId: string;
  showServices?: boolean;
}

export interface View {
  showPage: (pageName: string, params?: ParamTypes) => void;
}

const App = () => {
  const [page, setPage] = useState('');
  const [providerId, setProviderId] = useState('');
  const [showServices, setShowServices] = useState(false);
  const view: View = {
    showPage: (pageName: string, params?: ParamTypes) => {
      setPage(pageName);
      if (params && params.providerId) { setProviderId(params.providerId); }
      if (params && params.showServices) {
        setShowServices(params.showServices);
      } else setShowServices(false);
    },
  };

  return (
    <BrowserRouter>
      <Fragment>
        <PageRouter view={view} />
        {page === 'home' && <HomePage />}
        {page === 'providers' && <ServiceProviderList />}
        {page === 'provider' && <ProviderPage providerId={providerId} showServices={showServices} />}
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
