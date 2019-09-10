import React from 'react';

import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import 'babel-polyfill';
import store from 'store';

// components
import Header from 'components/Header';
import Routes from './Routes';

const App = () => (
  <Provider store={store}>
    <Header />
    <Routes />
  </Provider>
);

export default hot(App);
