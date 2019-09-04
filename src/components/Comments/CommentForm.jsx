import React from 'react';

import PropTypes from 'prop-types';

const CommentForm = ({
  handleChange, saveComment, saving = false, comment, count
}) => (
  <form onSubmit={saveComment} className="ui form">
    <div className="field">
      <textarea
        name="comment"
        rows={3}
        placeholder="Write a comment..."
        onChange={handleChange}
        value={comment}
        disabled={saving}
        required
      />
    </div>
    <div className="comment-publish">
      <div className={`comment-publish__count ${count < 0 && 'danger'}`}>{`${count} characters`}</div>
      <button
        className={`massive ui right floated button ${saving && 'disabled loading'} ${count < 0 && 'disabled'}`}
        type="submit"
      >
        Comment
      </button>
    </div>

  </form>
);

CommentForm.propTypes = {
  handleChange: PropTypes.func.isRequired,
  saveComment: PropTypes.func.isRequired,
  saving: PropTypes.bool.isRequired,
  comment: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired
};

export default CommentForm;
