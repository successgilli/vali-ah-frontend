/* eslint-disable no-unused-vars */
// react libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// utils
import classNames from 'utils/classnames';

import './ButtonWithIcon.scss';

const ButtonWithIcon = (props) => {
  const { icon, color, className, children, onClick } = props;
  const iconClassList = classNames(icon, 'icon');
  const wrapperClassList = classNames('ui', color, 'labeled icon button', className);

  return (
    <div className={wrapperClassList} keyUp={onClick} onClick={onClick}>
      {children}
      <i className={iconClassList} />
    </div>
  );
};

ButtonWithIcon.propTypes = {
  icon: PropTypes.string,
  className: PropTypes.string,
  color: PropTypes.string,
  children: PropTypes.node,
  onClick: PropTypes.func.isRequired
};

ButtonWithIcon.defaultProps = {
  className: '',
  icon: 'add',
  color: 'orange',
  children: ''
};

export default ButtonWithIcon;
