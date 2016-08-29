import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { Router, browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux'

import { AuthService, LocalStorageService } from '../common/services';
import createStore from '../common/store/createStore';
import routes from '../common/routes';

const store = createStore({}, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const auth = new AuthService(
  window.__SERVER_CONFIG__.auth0.clientId,
  window.__SERVER_CONFIG__.auth0.domain,
  LocalStorageService.shared(),
  `${window.location.origin}/login`,
  history
);

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      {routes(auth)}
    </Router>
  </Provider>,
  document.getElementById('root')
);

