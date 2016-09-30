import React from 'react';
import ReactDOM from 'react-dom';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import { AuthService, LocalStorageService } from '../common/services';
import createStore from '../common/store/createStore';
import Root from './root';

const store = createStore({}, browserHistory);
const history = syncHistoryWithStore(browserHistory, store);
const auth = new AuthService(
  window.__SERVER_CONFIG__.auth0.clientId,
  window.__SERVER_CONFIG__.auth0.domain,
  LocalStorageService.shared(),
  `${window.location.origin}/login`,
  history
);

const rootElement = document.getElementById('root');
ReactDOM.render(<Root store={store} history={history} auth={auth}/>, rootElement);

if(module.hot) {
  const AppContainer = require('react-hot-loader');
  module.hot.accept('./root', () => {
    const NewRoot = require('./root');
    ReactDOM.render(
      <AppContainer>
        <NewRoot store={store} history={history} auth={auth} />
      </AppContainer>,
      rootElement
    );
  });
}
