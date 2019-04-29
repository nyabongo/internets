import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { View } from '../..';

interface Prop {
  view: View;
}

const PageRouter = ({ view }: Prop) => (
  <Switch>
    <Route path="/providers/:providerId" render={({ match: { params } }) => { view.showPage('provider', params); return null; }} />
    <Route path="/providers" render={() => { view.showPage('providers'); return null; }} />
    <Route render={() => { view.showPage('home'); return null; }} />
  </Switch>
);

export default PageRouter;
