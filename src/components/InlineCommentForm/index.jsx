/* eslint-disable no-unused-vars */
// react libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// utils
import classNames from 'utils/classnames';

import './InlineCommentForm.scss';

const CommentForm = (props) => {
  return (
    <div className="comment-form">
      <div className="ui form">
        <div className="field">
          <textarea rows="5" />
        </div>
        <div className="field">
          <textarea rows="1" />
        </div>
      </div>
    </div>
  );
};

export default CommentForm;
