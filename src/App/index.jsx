// react libraries
import React from 'react';

// third-party libraries
import { hot } from 'react-hot-loader/root';

// components
import Header from 'components/Header';
import Routes from './Routes';

const App = () => (
  <div>
    <Header />
    <Routes />
  </div>
);

export default hot(App);
