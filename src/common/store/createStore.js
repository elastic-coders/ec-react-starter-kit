import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import promiseMiddleware from 'redux-promise';
import reduxLogger from 'redux-logger';
import rootReducer from './reducers';

export default (initialState, history) => {
  const create = compose(
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(promiseMiddleware),
    applyMiddleware(reduxLogger())
  )(createStore);
  const store = create(rootReducer, initialState);

  // Enable Webpack hot module replacement for reducers
  if (module.hot) {
    module.hot.accept('./reducers/index', () => {
      const nextRootReducer = require('./reducers/index');
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
