/* eslint-disable no-unused-vars */
// react libraries
import React, { useState } from 'react';

import PropTypes from 'prop-types';

import Button from 'components/Button';
import ButtonWithIcon from 'components/ButtonWithIcon';

import './InlineCommentForm.scss';

const CommentForm = (props) => {
  const [formOpen, setFormOpen] = useState(false);
  const openForm = () => setFormOpen(!formOpen);
  const { isCreating, style } = props;
  const icon = formOpen ? 'minus' : 'add';
  return (
    <div className="comment-form" style={style}>
      <ButtonWithIcon icon={icon} onClick={openForm} className="comment-form__create-comment">{formOpen ? 'Cancel' : 'Create' }</ButtonWithIcon>
      { formOpen && (
        <div className="ui form">
          <div className="field">
            <textarea rows="6" />
            {isCreating && <Button>Comment</Button>}
          </div>
        </div>
      )}
    </div>
  );
};

CommentForm.propTypes = {
  isCreating: PropTypes.bool,
  style: PropTypes.isRequired
};

CommentForm.defaultProps = {
  isCreating: true
};

export default CommentForm;
