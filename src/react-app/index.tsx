import React, { useState, Fragment } from 'react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './components/home-page';
import PageRouter from './components/page-router';
import ServiceProviderList from './components/service-providers/list';

export interface View {
  showPage: (pageName: string) => void;
}

const App = () => {
  const [page, setPage] = useState('');
  const view: View = {
    showPage: (pageName: string) => {
      setPage(pageName);
    },
  };

  return (
    <BrowserRouter>
      <Fragment>
        <PageRouter view={view} />
        {page === 'home' && <HomePage />}
        {page === 'providers' && <ServiceProviderList />}
      </Fragment>
    </BrowserRouter>
  );
};

export default App;
