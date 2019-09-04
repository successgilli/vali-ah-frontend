// react libraries
import React, { Component } from 'react';

// third-party libraries
import PropTypes from 'prop-types';

// sagas (action creators)
import { requestFetchArticle } from 'modules/articles';

// utils
import connect from 'utils/connect';

// components
import FacebookShareButton from 'components/SocialShareButtonRow/FacebookShareButton';
import TwitterShareButton from 'components/SocialShareButtonRow/TwitterShareButton';
import EmailShareButton from 'components/SocialShareButtonRow/EmailShareButton';

// styles
import './SocialShareButtons.scss';


class SocialShareButtonRow extends Component {
  static propTypes = {
    requestFetchArticle: PropTypes.func.isRequired,
    match: PropTypes.shape({
      params: PropTypes.shape({
        articleSlug: PropTypes.string
      })
    }).isRequired
  }

  constructor(props) {
    super(props);
    this.baseUrl = process.env.API_ROUTE;
  }

  componentDidMount() {
    const { requestFetchArticle: fetchArticleHandler } = this.props;
    const { match: { params: { articleSlug } } } = this.props;
    fetchArticleHandler({ articleSlug });
  }

  render() {
    return (
      <div className="social-share-buttons">
        <span className="social-share-buttons__span">Share: </span>
        <FacebookShareButton bigData={this.props} baseUrl={this.baseUrl} />
        <div className="social-share-buttons__space" />
        <TwitterShareButton bigData={this.props} baseUrl={this.baseUrl} />
        <div className="social-share-buttons__space" />
        <EmailShareButton bigData={this.props} baseUrl={this.baseUrl} />
      </div>
    );
  }
}

export default connect({ requestFetchArticle })(SocialShareButtonRow);
