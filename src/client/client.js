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
  window.SERVER_CONFIG.auth0.clientId,
  window.SERVER_CONFIG.auth0.domain,
  LocalStorageService.shared(),
  `${window.location.origin}/login`,
  history
);

const rootElement = document.getElementById('root');
ReactDOM.render(<Root store={store} history={history} auth={auth} />, rootElement);

/* eslint-disable */
// TODO this should be handled somewhere differently, like in webpack
if (module.hot) {
  const AppContainer = require('react-hot-loader').AppContainer;

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
/* eslint-enable */
