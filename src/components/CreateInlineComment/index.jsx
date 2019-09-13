/* eslint-disable no-unused-vars */
// react libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// utils
import classNames from 'utils/classnames';

import './CreateInlineComment.scss';

const CreateComment = (props) => {
  const { icon, text, color } = props;
  const iconClassList = classNames(icon, 'icon');
  const wrapperClassList = classNames('ui', color, 'labeled icon button');

  return (
    <div className={wrapperClassList}>
      {text}
      <i className={iconClassList} />
    </div>
  );
};

CreateComment.propTypes = {
  text: PropTypes.string,
  icon: PropTypes.string,
  color: PropTypes.string
};

CreateComment.defaultProps = {
  text: 'Add Comment',
  icon: 'add',
  color: 'orange'
};

export default CreateComment;
