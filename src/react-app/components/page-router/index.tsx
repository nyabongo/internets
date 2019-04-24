import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { View } from '../..';

interface Prop {
  view: View;
}

const PageRouter = ({ view }: Prop) => (
  <Switch>
    <Route
      render={() => {
        view.showPage('home');
        return null;
      }}
    />
  </Switch>
);

export default PageRouter;
