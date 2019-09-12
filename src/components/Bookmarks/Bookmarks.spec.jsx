import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';

import mockStore from 'fixtures/store';
import { state } from 'fixtures/bookmarkedArticles';

import ConnectedBookmarks from './index';

const store = mockStore({ state });

describe('Comments Component', () => {
  it('should render properly', () => {
    const bookmarkedArticles = mount(
      <Provider store={store}>
        <Router>
          <ConnectedBookmarks />
        </Router>
      </Provider>
    );

    expect(bookmarkedArticles.find('.bookmark')).toBeDefined();
    expect(bookmarkedArticles.find('.bookmark').find('.bookmark__content')).toHaveLength(1);
    expect(bookmarkedArticles.find('.bookmark').find('BookmarkCard')).toHaveLength(4);
  });
});
