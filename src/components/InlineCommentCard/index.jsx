/* eslint-disable object-curly-newline */
// react libraries
import React from 'react';
import PropTypes from 'prop-types';

import classNames from 'utils/classnames';

import avatar from 'assets/images/avatar-icon-png-8.jpg';

import './InlineCommentCard.scss';

/**
 * Component to create Comment form
 *
 * @summary create a form to create a comment
 */
const CommentCard = (props) => {
  const { comments, style } = props;
  return (
    <>
      {!!comments.length && (
        <div className="ui cards vertical inline-comment" style={style}>
          {comments.map(({ user, highlightedText, content, Valid }) => (
            <div className="card">
              <div className="content">
                <img className="right floated mini ui image" alt="" src={user.image || avatar} />
                <div className="meta">
                  {user.userName}
                </div>
                <div className="description">
                  {content}
                </div>
              </div>
              <div className="extra content">
                <div className={classNames('ui inline-comment__status', { green: Valid, red: !Valid })}>{highlightedText}</div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

CommentCard.propTypes = {
  style: PropTypes.string.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    isValid: PropTypes.bool.isRequired,
    content: PropTypes.string.isRequired,
    highlightedText: PropTypes.string.isRequired,
    user: PropTypes.shape({
      userName: PropTypes.string,
      image: PropTypes.string
    }).isRequired,
  }))
};

CommentCard.defaultProps = {
  comments: []
};


export default CommentCard;
