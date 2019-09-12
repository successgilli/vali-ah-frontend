// react libraries
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

// third-party libraries
import { storiesOf } from '@storybook/react';

// components
import BookmarkCard from 'components/Bookmarks/BookmarkCard';

// modules
import articles from 'fixtures/bookmarkedArticles';

storiesOf('Bookmark card', module)
  .add('card design', () => (
    <Router>
      <BookmarkCard article={articles[0]} />
    </Router>
  ));
