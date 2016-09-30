import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import reduxLogger from 'redux-logger';
import rootEpic from '../epics';
import rootReducer from './reducers';

const epicMiddleware = createEpicMiddleware(rootEpic);

export default (initialState, history) => {
  const create = compose(
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(epicMiddleware),
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
