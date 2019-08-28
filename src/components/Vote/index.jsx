import React from 'react';

import PropTypes from 'prop-types';

// third-party libraries
import Icon from 'components/Icon';

// sagas (action creators)
import { voteOnArticle, initArticleVoteCount } from 'modules/articleVote';

import connect from 'utils/connect';
import classNames from 'utils/classnames';

import './Vote.scss';

/**
 * Component for article vote
 * @summary composes the upvote and the downvote icons along with the vote count
 */
class Vote extends React.Component {
  /**
    * @name Vote propTypes
    * @type {propTypes}
    *
    * @param {Object} props - React PropTypes
    *
    * @property {string} articleId - id of the article to vote on
    * @property {string} activeVoteType - article voteType by the current user
    * @property {Function} voteOnArticle - action creator to vote on an article
    * @property {Function} initArticleVoteCount - initialises the article vote count
    * @property {Function} articleVote - redux state map to props
    * @property {Function} upVoteCount - article's upvote count
    * @property {Function} downVoteCount - article's downvote count
    *
    */
  static propTypes = {
    articleId: PropTypes.string.isRequired,
    activeVoteType: PropTypes.string,
    voteOnArticle: PropTypes.func.isRequired,
    initArticleVoteCount: PropTypes.func.isRequired,
    articleVote: PropTypes.isRequired,
    upVoteCount: PropTypes.number,
    downVoteCount: PropTypes.number
  }

  static defaultProps = {
    activeVoteType: null,
    upVoteCount: 0,
    downVoteCount: 0
  }

  constructor(props) {
    super(props);
    this.state = { activeVoteType: props.activeVoteType };
  }

  componentDidMount() {
    const { initArticleVoteCount: articleVoteCount, upVoteCount, downVoteCount } = this.props;

    articleVoteCount({ upVoteCount, downVoteCount });
  }

  /**
    * Handles vote action
    * @method
    *
    * @param {Object} payload
    * @param {string} payload.voteType - type of vote
    *
    * @return {void}
    */
  onVoteHandler = ({ voteType }) => {
    const { voteOnArticle: voteOnArticleHandler, articleId } = this.props;
    const { activeVoteType } = this.state;

    const vote = voteType === activeVoteType ? 'nullVote' : voteType;

    voteOnArticleHandler({ articleId, voteType: vote, prevVote: activeVoteType });

    this.setState({ activeVoteType: vote });
  };

  render() {
    const { articleVote: { upVoteCount, downVoteCount } } = this.props;
    const { activeVoteType } = this.state;
    const upVoteActive = activeVoteType === 'upVote';

    const classList = classNames({
      active: activeVoteType !== 'nullVote' && !upVoteActive
    });

    return (
      <div className="vote">
        <div className="vote__wrapper">
          <Icon icon="upvote" voteType="upVote" clickHandler={this.onVoteHandler} active={upVoteActive} />
          <span className={`${upVoteActive && 'active'}`}>{upVoteCount}</span>
        </div>
        <div className="vote__wrapper">
          <Icon icon="downvote" voteType="downVote" clickHandler={this.onVoteHandler} active={activeVoteType !== 'nullVote' && !upVoteActive} />
          <span className={classList}>{downVoteCount}</span>
        </div>
      </div>
    );
  }
}

export default connect({ voteOnArticle, initArticleVoteCount })(Vote);
