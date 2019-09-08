// react libraries
import React from 'react';

// third-party libraries
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';
import 'babel-polyfill';

// components
import Header from 'components/Header';
import Routes from './Routes';

// store
import store from '../store';

const App = () => (
  <Provider store={store}>
    <Header />
    <Routes />
  </Provider>
);

export default hot(App);
