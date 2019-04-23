import React, { useState, Fragment } from 'react';
import Controller from '../App/controller';
import View from '../App/interfaces/view';
import Db from '../db';
import Model from '../App/interfaces/model';
import Presenter from '../App/interfaces/presenter';
import HomePage from './components/home-page';
import PageRouter from './components/page-router';
import { BrowserRouter } from 'react-router-dom';

const App = () => {
  const [page, setPage] = useState('');
  const model: Model = new Db();
  const view: View = {
    showPage: (pageName: string) => {
      setPage(pageName);
    },
  };
  const controller: Presenter = new Controller(view, model);

  return (
    <BrowserRouter>
      <Fragment>
        <PageRouter view={view} />
        {page === 'home' && <HomePage />}
      </Fragment>
    </BrowserRouter>
  );

};

export default App;
