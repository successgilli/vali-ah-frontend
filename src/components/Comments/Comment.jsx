import React from 'react';

import PropTypes from 'prop-types';

// utils
import { formatDate } from 'utils/formatDate';
import userAvatar from 'assets/images/userAvatar.png';

const Comment = ({ comment }) => {
  const {
    commentAuthor, createdAt, content, userId
  } = comment;

  const { avatarUrl = userAvatar, firstName, lastName, } = commentAuthor;
  const formattedDate = formatDate(createdAt);
  const fullName = `${firstName} ${lastName}`;
  const userHref = userId; // Todo: Create User Href here with ID
  const avatar = avatarUrl || userAvatar;

  return (
    <div className="comment">
      <a href={userHref} className="avatar">
        <img alt="" src={avatar} className="avatar" />
      </a>
      <div className="content">
        <div className="meta">
          <a href={userHref} className="author">{fullName}</a>
          <div className="metadata">
            <span className="date">{formattedDate}</span>
          </div>
        </div>
        <div className="text">
          {content}
        </div>
      </div>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    createdAt: PropTypes.string.isRequired,
    content: PropTypes.string.isRequired,
    userId: PropTypes.string.isRequired,
    commentAuthor: PropTypes.shape({
      avatarUrl: PropTypes.string,
      firstName: PropTypes.string.isRequired,
      lastName: PropTypes.string.isRequired,
    })
  }).isRequired
};

export default Comment;
