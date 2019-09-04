// react libraries
import React from 'react';
import PropTypes from 'prop-types';

// third-party libraries
import { connect } from 'react-redux';

// components
import Icon from 'components/Icon';

// sagas (action creators)
import { voteArticle, initArticleVoteCount } from 'modules/articleVote';

// utils
import classNames from 'utils/classnames';

// styles
import './Vote.scss';

/**
 * Component for article vote
 * @summary composes the upvote and the downvote icons along with the vote count
 */
export class Vote extends React.Component {
  /**
    * @name Vote propTypes
    * @type {propTypes}
    *
    * @param {Object} props - React PropTypes
    *
    * @property {string} articleId - id of the article to vote on
    * @property {string} activeVoteType - article voteType by the current user
    * @property {Function} voteArticle - action creator to vote on an article
    * @property {Function} initArticleVoteCount - initialises the article vote count
    * @property {Function} articleVote - redux state map to props
    * @property {Function} upVoteCount - article's upvote count
    * @property {Function} downVoteCount - article's downvote count
    *
    */
  static propTypes = {
    articleId: PropTypes.string.isRequired,
    activeVoteType: PropTypes.string,
    voteArticle: PropTypes.func.isRequired,
    initArticleVoteCount: PropTypes.func.isRequired,
    upVoteCount: PropTypes.number.isRequired,
    downVoteCount: PropTypes.number.isRequired
  }

  static defaultProps = {
    activeVoteType: null
  }

  constructor(props) {
    super(props);
    this.state = { activeVoteType: props.activeVoteType };
  }

  componentDidMount() {
    /*
      This should be initialized anytime a new article is loaded
      TODO(Miracle): Confirm if this should be removed from here after Articles page is complete
    */
    const {
      initArticleVoteCount: initializeArticleVoteCount,
      upVoteCount,
      downVoteCount
    } = this.props;

    initializeArticleVoteCount({ upVoteCount, downVoteCount });
  }

  /**
    * Handle vote action
    * @method
    *
    * @param {Object} payload
    * @param {string} payload.voteType - type of vote
    *
    * @return {void}
    */
  onVoteHandler = (voteType) => () => {
    const { voteArticle: voteArticleHandler, articleId } = this.props;
    const { activeVoteType } = this.state;
    const vote = voteType === activeVoteType ? 'nullVote' : voteType;

    voteArticleHandler({ articleId, voteType: vote, prevVote: activeVoteType });

    this.setState({ activeVoteType: vote });
  };

  render() {
    const { upVoteCount, downVoteCount } = this.props;
    const { activeVoteType } = this.state;
    const upVoteActive = activeVoteType === 'upVote';
    const downVoteActive = activeVoteType !== 'nullVote' && !upVoteActive;
    const upVoteClassList = classNames({ active: upVoteActive });
    const downVoteClassList = classNames({ active: downVoteActive });

    return (
      <div className="vote">
        <div className="vote__wrapper">
          <Icon icon="upvote" onClick={this.onVoteHandler('upVote')} active={upVoteActive} />
          <span className={upVoteClassList}>{upVoteCount}</span>
        </div>
        <div className="vote__wrapper">
          <Icon icon="downvote" onClick={this.onVoteHandler('downVote')} active={downVoteActive} />
          <span className={downVoteClassList}>{downVoteCount}</span>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  upVoteCount: state.articleVote.votes.upVoteCount,
  downVoteCount: state.articleVote.votes.downVoteCount
});

export default connect(mapStateToProps, { voteArticle, initArticleVoteCount })(Vote);
