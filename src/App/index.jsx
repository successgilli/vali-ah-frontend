// react libraries
import React from 'react';

// third-party libraries
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import 'babel-polyfill';

// components
import Routes from './Routes';

// store
import store from '../store';

const App = () => (
  <Provider store={store}>
    <Routes />
  </Provider>
);

export default hot(App);
