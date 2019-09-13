// react libraries
import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';
import { Provider } from 'react-redux';
// import { action } from '@storybook/addon-actions';

import { Follow } from 'components/Follow';
import store from '../../store/index';

// components

storiesOf('Follow', module)
  .add('Default View', () => (
    <Provider store={store}>
      <Follow>Follow</Follow>
    </Provider>
  ));
