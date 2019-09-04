// react libraries
import 'babel-polyfill';
import React from 'react';

// third-party libraries
import { hot } from 'react-hot-loader/root';
import { Provider } from 'react-redux';

// components
// import Header from 'components/Header';
import InfiniteScroll from 'components/Infinite-scroll';

// import Routes from './Routes';

// store
import store from '../store';

const App = () => (
  <Provider store={store}>
    {/* <Header /> */}
    <InfiniteScroll>
      <div>
        <li>reggt</li>
        <li>reggt</li>
        <li>reggt</li>
      </div>
    </InfiniteScroll>
    {/* <Routes /> */}
  </Provider>
);

export default hot(App);
