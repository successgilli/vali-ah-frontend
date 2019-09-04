import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { getCommentsRequest, createCommentRequest } from 'modules/articleComments';
import Spinner from 'components/Spinner';
import { sortDateLatest } from 'utils/formatDate';

import Comment from './Comment';
import CommentForm from './CommentForm';

import './Comments.scss';

export class CommentsComponent extends React.Component {
  static propTypes = {
    articleId: PropTypes.string.isRequired,
    getCommentsRequest: PropTypes.func.isRequired,
    createCommentRequest: PropTypes.func.isRequired,
    comments: PropTypes.arrayOf(Object).isRequired,
    createdComment: PropTypes.shape({}).isRequired,
    loading: PropTypes.bool.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      comment: '',
      saving: false,
      count: 0,
      charsLeft: 256
    };
  }

  componentDidMount() {
    const { getCommentsRequest: getComments, articleId } = this.props;
    getComments(articleId);
  }

  componentDidUpdate(prevProps) {
    const { getCommentsRequest: getComments, articleId, createdComment } = this.props;
    if (prevProps.createdComment !== createdComment) {
      getComments(articleId);
    }
  }

  validate = () => {
    const { count } = this.state;
    const charsLeft = 256 - count;
    this.setState({ charsLeft });
  }

  handleChange = async (evt) => {
    const { name, value } = evt.target;

    await this.setState(() => ({
      [name]: value,
      count: value.length
    }));
    this.validate();
  };

  handleSave = async (evt) => {
    evt.preventDefault();
    const { createCommentRequest: createComment, articleId } = this.props;
    const { comment, charsLeft } = this.state;
    if (charsLeft >= 0) {
      this.setState({ saving: true });
      await createComment(articleId, comment);
      this.setState({ saving: false, comment: '' });
    }
  };

  render() {
    const { loading, comments } = this.props;
    const { comment, saving, charsLeft } = this.state;
    const sortedComments = sortDateLatest(comments);

    return (
      <div className="Comment">
        <div className="ui comments">
          <h3 className="ui dividing header">Comments</h3>
          {loading ? (
            <Spinner />
          ) : (
            <>
              {sortedComments.map((singleComment) => (
                <Comment
                  comment={singleComment}
                  key={singleComment.id}
                />
              ))}
              <CommentForm
                handleChange={this.handleChange}
                saveComment={this.handleSave}
                count={charsLeft}
                saving={saving}
                comment={comment}
              />
            </>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ articleComments }) => ({
  comments: articleComments.comments,
  loading: articleComments.apiCallInProgress,
  error: articleComments.error,
  createdComment: articleComments.createdComment
});

export default connect(mapStateToProps,
  { getCommentsRequest, createCommentRequest })(CommentsComponent);
