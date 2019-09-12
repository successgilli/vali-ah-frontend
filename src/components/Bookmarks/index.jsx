import React from 'react';
import PropTypes from 'prop-types';
import connect from 'utils/connect';

import { getBookmarkedArticlesRequest } from 'modules/bookmarkedArticles';

import articles from 'fixtures/bookmarkedArticles';
import BookmarkCard from './BookmarkCard';


import './Bookmarks.scss';

class Bookmarks extends React.Component {
  static propTypes = {
    getBookmarkedArticlesRequest: PropTypes.func.isRequired,
    bookmarks: PropTypes.shape({
      articles: PropTypes.arrayOf(Object),
      loading: PropTypes.bool
    }).isRequired
  };

  componentDidMount() {
    const { getBookmarkedArticlesRequest: getArticles } = this.props;
    getArticles();
  }

  // eslint-disable-next-line arrow-body-style
  renderBookmarkedArticles = () => {
    // const { bookmarks: { articles } } = this.props;
    return articles.map((article) => (<BookmarkCard key={article.articleId} article={article} />));
  }

  render() {
    return (
      <div className="bookmark">
        <div className="bookmark__content">
          <div>
            <div className="bookmark__feed">Bookmarks</div>
            {this.renderBookmarkedArticles()}
          </div>
        </div>
      </div>
    );
  }
}

export default connect({ getBookmarkedArticlesRequest })(Bookmarks);
