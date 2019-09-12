// react libraries
import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';

import store from 'store/index';

// components
import Modal from './index';

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
  ));
