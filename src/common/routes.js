import React from 'react';
import { Route } from 'react-router';

import App from './containers/App';
import Login from './containers/Login';
import Private from './components/Private';

export default (auth) => {
  const requireAuth = (nextState, replace, callback) => {
    if (auth.loggedIn()) {
      callback();
    } else {
      auth.login(nextState.location.pathname).catch(err => {
        replace({ pathname: '/login' });
        callback(err);
      });
    }
  };
  return (
    <Route path="/" component={App} auth={auth}>
      <Route path="login" component={Login} />
      <Route path="private" component={Private} onEnter={requireAuth} />
    </Route>
  );
};
