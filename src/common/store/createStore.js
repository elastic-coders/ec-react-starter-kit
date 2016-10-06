import { createStore, compose, applyMiddleware } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import { createEpicMiddleware } from 'redux-observable';
import reduxLogger from 'redux-logger';
import rootEpic from './epics';
import rootReducer from './reducers';

const epicMiddleware = createEpicMiddleware(rootEpic);

export default (initialState, history) => {
  const create = compose(
    applyMiddleware(routerMiddleware(history)),
    applyMiddleware(epicMiddleware),
    applyMiddleware(reduxLogger())
  )(createStore);
  const store = create(rootReducer, initialState);

  /* eslint-disable */
  // Enable Webpack hot module replacement for reducers
  // TODO this should be handled somewhere else, not in the production code
  if (module.hot) {
    module.hot.accept('./reducers/index', () => {
      const nextRootReducer = require('./reducers/index');

      store.replaceReducer(nextRootReducer);
    });
  }
  /* eslint-enable */

  return store;
};
