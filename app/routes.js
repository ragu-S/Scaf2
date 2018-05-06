/* eslint flowtype-errors/show-errors: 0 */
import React from 'react';
import { Switch, Route } from 'react-router';
import App from './components/App/App';
import WorkSpace from './components/WorkSpace/WorkSpace';

export default () => (
  <App>
    <Switch>
      <Route path="/" component={WorkSpace} />
    </Switch>
  </App>
);
