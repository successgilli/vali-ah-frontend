// react libraries
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// third-party libraries
import { storiesOf } from '@storybook/react';

// components
import SubscriptionCard from './index';

storiesOf('Subscription Card', module)
  .add('default view', () => (
    <Router>
      <SubscriptionCard title="The biginning" slug="the-slug-111" summary="summary is too short. Hope it is long" />
    </Router>
  ));
