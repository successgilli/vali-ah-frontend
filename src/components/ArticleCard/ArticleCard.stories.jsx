// react libraries
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// third-party libraries
import { storiesOf } from '@storybook/react';

// components
import ArticleCard from 'components/ArticleCard';

storiesOf('ArticleCard', module)
  .add('default view', () => (
    <Router>
      <ArticleCard summary="" category="" title="" />
    </Router>
  ))
  .add('with some props', () => (
    <Router>
      <ArticleCard category="History" title="This is the Card title." summary="The summary of the article is displayed on the card body." />
    </Router>
  ));
