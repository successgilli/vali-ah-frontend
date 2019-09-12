// react libraries
import * as React from 'react';

// third-party libraries
import { storiesOf } from '@storybook/react';

// components
import ArticleCard from 'components/ArticleCard';

storiesOf('ArticleCard', module)
  .add('default view', () => <ArticleCard summary="" category="" title="" />)
  .add('with some props', () => <ArticleCard category="History" title="This is the Card title." summary="The summary of the article is displayed on the card body." />);
