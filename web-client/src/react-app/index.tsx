import React, { useState, Fragment, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { init, DBProvider } from '../db';
import HomePage from './components/home-page';
import PageRouter from './components/page-router';
import ServiceProviderList from './components/service-providers/list';
import ProviderPage from './components/service-providers/single';
import Database from '../db/dyna-db';
import { Data } from '../db/dyna-db/data';
import LoadingIndicator from './components/loading-indicator';
import PlansTable from './components/view-widgets/plans/table';

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
  const [sheetId] = useState('1rvw0C2CB0cgEOjDxMDK_kcwDxzlu7Xt_yXX04Jg5pg4');
  const [data, setData] = useState();
  const [providerId, setProviderId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [planId, setPlanId] = useState('');
  const [showServices, setShowServices] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const view: View = {
    showPage: (pageName: string, params?: ParamTypes) => {
      setPage(pageName);
      if (params) {
        setProviderId(params.providerId);
        setServiceId(params.serviceId || '');
        setPlanId(params.planId || '');
        setShowServices(params.showServices || false);
        setShowPlans(params.showPlans || false);
      }
    },
  };
  useEffect(() => {
    init(sheetId).then((result) => {
      const fetchedData = result as Data;
      setData(new Database(fetchedData));
    }).catch(() => {
      // likely already initialised
    });
  }, [sheetId]);

  return (
    <BrowserRouter>
      <DBProvider value={data}>
        <PageRouter view={view} />
        {data ? (
          <Fragment>
            {page === 'home' && <HomePage />}
            {page === 'providers' && <ServiceProviderList />}
            {page === 'provider' && (
              <ProviderPage
                providerId={providerId}
                serviceId={serviceId}
                planId={planId}
                showServices={showServices}
                showPlans={showPlans}
              />
            )}
            <PlansTable />
          </Fragment>
        ) : (
          <div style={{ padding: '256px 0' }}>
            <LoadingIndicator />
          </div>
        )
        }
      </DBProvider>
    </BrowserRouter>
  );
};

export default App;
