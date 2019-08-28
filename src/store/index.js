// third-party libraries
import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './rootReducer';
import rootSaga from './rootSaga';

const enhancers = [];
const initialState = {};
const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

if (process.env.NODE_ENV === 'development') {
  /* eslint-disable import/no-extraneous-dependencies, global-require */
  const logger = require('redux-logger').default;
  middlewares.push(logger);

  const { __REDUX_DEVTOOLS_EXTENSION__ } = window;

  if (typeof __REDUX_DEVTOOLS_EXTENSION__ === 'function') {
    enhancers.push(__REDUX_DEVTOOLS_EXTENSION__());
  }
}

const composedEnhancers = compose(applyMiddleware(...middlewares), ...enhancers);
const store = createStore(rootReducer, initialState, composedEnhancers);

sagaMiddleware.run(rootSaga);

export default store;
