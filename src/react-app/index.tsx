import React, { useState, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './components/home-page';
import PageRouter from './components/page-router';
import ServiceProviderList from './components/service-providers/list';
import ProviderPage from './components/service-providers/single';

interface ParamTypes {
  providerId: string;
  showServices?: boolean;
  showPlans?: boolean;
  serviceId?: string;
  planId?: string;
}

export interface View {
  showPage: (pageName: string, params?: ParamTypes) => void;
}

const App = () => {
  const [page, setPage] = useState('');
  const [providerId, setProviderId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [showServices, setShowServices] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const view: View = {
    showPage: (pageName: string, params?: ParamTypes) => {
      setPage(pageName);
      if (params) {
        setProviderId(params.providerId);
        setServiceId(params.serviceId || '');
        setShowServices(params.showServices || false);
        setShowPlans(params.showPlans || false);
      }
    },
  };

  return (
    <BrowserRouter>
      <Fragment>
        <PageRouter view={view} />
        {page === 'home' && <HomePage />}
        {page === 'providers' && <ServiceProviderList />}
        {page === 'provider' && (
          <ProviderPage
            providerId={providerId}
            serviceId={serviceId}
            showServices={showServices}
            showPlans={showPlans}
          />
        )}
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
