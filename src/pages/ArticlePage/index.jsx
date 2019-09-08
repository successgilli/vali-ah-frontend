// react libraries
import React, { Component } from 'react';

// third-party libraries
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';
import moment from 'moment';

// scss
import './ArticleView.scss';

// helper functions
import connect from 'utils/connect';

// modules
import { getArticleRequest } from 'modules/getArticle';
import Loader from 'components/Loader/Loader';

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
      const fullname = `${article.Author.firstName} ${article.Author.firstName}`;
      const { body, updatedAt, title } = article;
      return (
        <div className="article">
          <img src={`https://source.unsplash.com/1600x900/?${article.title}`} className="article__img-cover" alt="" />
          <div className="article__info">
            <p className="article__title">{title}</p>
            <div className="article__author">
              <img className="article__author__img" src={`https://ui-avatars.com/api/?name=${fullname}&size=24`} alt="" />
              <p className="article__author__name">
                {fullname}
              </p>
              <p className="article__date">{ moment(updatedAt).format('MMM Do YY')}</p>
              <p className="article__bookmark">BM </p>
            </div>
            <div className="article__content">
              { ReactHtmlParser(body) }
            </div>
            <div className="article__vote-social-holder">
              <div className="vote-wrapper">Vote component</div>
              <div className="social-sharing-wrapper">Share component</div>
            </div>
            <hr className="article__divider" />
            <div className="article__comments">Comment component</div>
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
