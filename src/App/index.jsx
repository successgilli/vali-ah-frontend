import React from 'react';

import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import 'babel-polyfill';

import Header from 'components/Header';

import store from 'store';

import Routes from './Routes';

const App = () => (
  <Provider store={store}>
    <Header />
    <Routes />
  </Provider>
);

export default hot(App);
