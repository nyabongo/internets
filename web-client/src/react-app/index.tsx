import React, { useState, useEffect } from 'react';
import { BrowserRouter } from 'react-router-dom';
import { createStyles, withStyles, Theme } from '@material-ui/core';
import { init, DBProvider } from '../db';
import HomeNav from './components/home-nav';
import PageRouter from './components/page-router';
import ServiceProviderList from './components/service-providers/list';
import ProviderPage from './components/service-providers/single';
import Database from '../db/dyna-db';
import { Data } from '../db/dyna-db/data';
import LoadingIndicator from './components/loading-indicator';
import PlansTable from './components/view-widgets/plans/table';
import { Filter, FilterProvider } from '../db/filter';

const styles = createStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  nav: {
    flexGrow: 1,
    [theme.breakpoints.up('sm')]: {
      maxWidth: '320px',
    },
    padding: '4px 2px',
  },
  content: {
    flexGrow: 1,
    padding: '4px 2px',
  },
}));

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

const App = ({ classes }: {classes: any}) => {
  const [page, setPage] = useState('');
  const [sheetId] = useState('1rvw0C2CB0cgEOjDxMDK_kcwDxzlu7Xt_yXX04Jg5pg4');
  const [data, setData] = useState();
  const [providerId, setProviderId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [planId, setPlanId] = useState('');
  const [showServices, setShowServices] = useState(false);
  const [showPlans, setShowPlans] = useState(false);
  const [filter] = useState(new Filter());
  const view: View = {
    showPage: (pageName: string, params?: ParamTypes) => {
      setPage(pageName);
      if (params) {
        setProviderId(params.providerId);
        filter.setProvider(params.providerId || '');
        setServiceId(params.serviceId || '');
        filter.setService(params.serviceId || '');
        setPlanId(params.planId || '');
        setShowServices(params.showServices || false);
        setShowPlans(params.showPlans || false);
      } else {
        setProviderId('');
        setServiceId('');
        setPlanId('');
        filter.setProvider('');
        filter.setService('');
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
      <FilterProvider value={filter}>
        <DBProvider value={data}>
          <PageRouter view={view} />
          {data ? (
            <div className={classes.root}>
              <section className={classes.nav}>
                {page === 'home' && <HomeNav />}
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
              </section>
              <section className={classes.content}>
                {!planId && <PlansTable />}
              </section>
            </div>
          ) : (
            <div style={{ padding: '256px 0' }}>
              <LoadingIndicator />
            </div>
          )
          }
        </DBProvider>
      </FilterProvider>
    </BrowserRouter>
  );
};

export default withStyles(styles)(App);
