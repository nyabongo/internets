import React from 'react';
import View from '../../../App/interfaces/view';
import { Switch, Route } from 'react-router-dom';

type Prop = {
  view: View,
};

const PageRouter = ({ view }: Prop) => {
  return (
    <Switch>
      <Route render={() => { view.showPage('home'); return null; }} />
    </Switch>
  );
};

export default PageRouter;
