import React from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import routes from '../common/routes';

export default ({ store, history, auth }) => (
  <Provider store={store}>
    <Router history={history}>
      {routes(auth)}
    </Router>
  </Provider>
);
