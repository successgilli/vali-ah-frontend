// react libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// components
import Button from 'components/Button';
import ButtonWithIcon from 'components/ButtonWithIcon';

import './InlineCommentForm.scss';

/**
 * Component to create Comment form
 *
 * @summary create a form to create a comment
 */
const CommentForm = (props) => {
  const [formOpen, setFormOpen] = useState(false);
  const [content, setContent] = useState('');

  const openForm = () => setFormOpen(!formOpen);
  const onFormChange = (event) => setContent(event.target.value);

  const {
    isCreating, style, createComment, isLoading,
    ValidationErrors
  } = props;

  const icon = formOpen ? 'minus' : 'add';

  const loader = isLoading && (
    <div className="ui active inverted dimmer">
      <div className="ui small text loader" />
    </div>
  );

  return (
    <div className="comment-form" style={style}>
      <ButtonWithIcon icon={icon} onClick={openForm} className="comment-form__create-comment">{formOpen ? 'Cancel' : 'Create' }</ButtonWithIcon>
      { formOpen && (
        <div className="ui form">
          <div className="field">
            <textarea rows="6" content={content} onChange={onFormChange} />
            <p>
              {ValidationErrors && ValidationErrors.content && (
                <span className="comment-form__error">
                  {ValidationErrors.content}
                </span>
              )}
            </p>
            {isCreating && (
              <Button onClick={() => createComment(content)}>
              Comment
                {loader}
              </Button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

/**
  * @name CommentForm propTypes
  * @type {propTypes}
  *
  * @param {Object} props - React PropTypes
  *
  * @property {boolean} isCreating - check if a comment is to be created or read
  * @property {Object} style - object to add to style
  * @property {Function} createComment - action handler to create a comment
  * @property {boolean} isLoading - check if comment is loading
  *
  */
CommentForm.propTypes = {
  isCreating: PropTypes.bool,
  style: PropTypes.isRequired,
  createComment: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  ValidationErrors: PropTypes.arrayOf(Array).isRequired
};

CommentForm.defaultProps = {
  isCreating: true,
  isLoading: false
};

export default CommentForm;
