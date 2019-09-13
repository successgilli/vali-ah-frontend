// react libraries
import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';

import store from 'store/index';

// components
import Modal from './index';

global.FB = {};
global.gapi = {};
global.FB.login = jest.fn();
global.FB.getLoginStatus = (cb) => {
  const res = {
    status: 'connected',
    authResponse: { access_token: 'theAccessToken' }
  };
  cb(res);
};
global.gapi.load = () => {};

storiesOf('Modal', module)
  .add('default signup view', () => (
    <Provider store={store}>
      <Modal show formType={false} />
    </Provider>
  ))
  .add('click sign in', () => (
    <Provider store={store}>
      <Modal show formType />
    </Provider>
  ))
  .add('click closed modal button', () => (
    <Provider store={store}>
      <Modal show={false} />
    </Provider>
  ))
  .add('click closed modal button', () => <Provider store={store}><Modal show={false} /></Provider>);
