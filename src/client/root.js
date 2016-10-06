import React, { PropTypes as T } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router';

import { AuthService } from '../common/services';
import routes from '../common/routes';

const RootProvider = ({ store, history, auth }) => (
  <Provider store={store}>
    <Router history={history}>
      {routes(auth)}
    </Router>
  </Provider>
);
RootProvider.propTypes = {
  store: T.object,    // eslint-disable-line react/forbid-prop-types
  history: T.object,  // eslint-disable-line react/forbid-prop-types
  auth: T.instanceOf(AuthService),
};

export default RootProvider;
