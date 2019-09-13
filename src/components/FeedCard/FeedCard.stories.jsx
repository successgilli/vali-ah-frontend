// react libraries
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// third-party libraries
import { storiesOf } from '@storybook/react';

// components
import { FeedCard } from 'components/FeedCard';

storiesOf('Feed card', module)
  .add('card design', () => (
    <Router>
      <FeedCard title="How to make good foed believe in something like anonimous" date="23rd June 2019" tag="productivity" slug="adedef-dfrer-1223" />
    </Router>
  ));
