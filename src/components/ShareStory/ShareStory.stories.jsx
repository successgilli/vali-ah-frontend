// react libraries
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// third-party libraries
import { storiesOf } from '@storybook/react';

// components
import ShareStory from './index';

storiesOf('ShareStory', module)
  .add('default view', () => (
    <Router>
      <ShareStory />
    </Router>
  ));
