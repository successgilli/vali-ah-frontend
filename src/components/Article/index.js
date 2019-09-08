// react libraries
import React, { Component } from 'react';

// third-party libraries
import PropTypes from 'prop-types';

// scss
import './Article.scss';

// helper functions
import connect from 'utils/connect';

// modules
import { getArticleRequest } from 'modules/getArticle';
import Loader from 'components/Loader/Loader';

// styles

class Article extends Component {
  static propTypes = {
    getArticleRequest: PropTypes.func.isRequired,
    match: PropTypes.string.isRequired,
    getArticle: PropTypes.isRequired
  };

  componentDidMount() {
    const { match } = this.props;
    const { articleSlug } = match.params;
    const { getArticleRequest: getArticle } = this.props;
    getArticle(articleSlug);
  }

  render() {
    const { getArticle } = this.props;
    const { article } = getArticle;
    if (Object.keys(getArticle.article).length > 0) {
      return (
        // eslint-disable-next-line react/jsx-filename-extension
        <div className="article">
          <img src={article.coverImageUrl} className="article__img-cover" alt="" />
          <div className="article__info">
            <p className="article__title">{article.title}</p>
            <div className="article__author">
              <img className="article__author__img" src="https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500" alt="" />
              <p className="article__author__name">
                {article.Author.firstName}
                {' '}
                {article.Author.firstName}
              </p>
            </div>
            <p className="article__body">This is an edited story about the ten bad wolves. This is an edited story about the ten bad wolves. This story is insanely good. What do you think? This story is insanely good. What do you think?</p>
          </div>
        </div>
      );
    }

    return (
      <div className="loader">
        <Loader size={90} />
      </div>
    );
  }
}

export default connect({ getArticleRequest })(Article);
