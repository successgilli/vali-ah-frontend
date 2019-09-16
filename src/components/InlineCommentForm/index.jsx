// react libraries
import React, { useState } from 'react';
import PropTypes from 'prop-types';

// components
import Button from 'components/Button';
import ButtonWithIcon from 'components/ButtonWithIcon';

import './InlineCommentForm.scss';

const Loader = () => (
  <div className="ui active inverted dimmer">
    <div className="ui small text loader" />
  </div>
);

/**
 * Component to create Comment form
 *
 * @summary create a form to create a comment
 */
const CommentForm = (props) => {
  const [formOpen, setFormOpen] = useState(false);
  const [content, setContent] = useState('');
  const { isCreating, createComment, isLoading } = props;
  const { position, ValidationErrors } = props;

  const loader = isLoading && <Loader />;
  const showButton = () => (<Button onClick={() => createComment(content)}>{'Create' && loader}</Button>);
  const displayErrors = (error) => (<span className="comment-form__error">{error}</span>);

  return (
    <div className="comment-form" style={{ position: 'absolute', top: position.top, left: position.left }}>
      <ButtonWithIcon icon={formOpen ? 'minus' : 'add'} onClick={() => setFormOpen(!formOpen)} className="comment-form__create-comment">{formOpen ? 'Cancel' : 'Create' }</ButtonWithIcon>
      { formOpen && (
        <div className="ui form">
          <div className="field">
            <textarea rows="6" content={content} onChange={(event) => setContent(event.target.value)} />
            <p>{!!ValidationErrors?.content && displayErrors(ValidationErrors.content)}</p>
            {isCreating && showButton()}
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
  position: PropTypes.shape({
    top: PropTypes.string,
    left: PropTypes.string
  }),
  createComment: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  ValidationErrors: PropTypes.arrayOf(Object).isRequired
};

CommentForm.defaultProps = {
  isCreating: true,
  isLoading: false,
  position: {}
};

export default CommentForm;
