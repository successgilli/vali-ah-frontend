// react libraries
import React from 'react';
import PropTypes from 'prop-types';

// utils
import classNames from 'utils/classnames';

import './ButtonWithIcon.scss';

/**
 * Component for Button with icon
 * @summary A button component with icon
 */
const ButtonWithIcon = (props) => {
  const {
    icon, color, className, children, onClick
  } = props;

  const iconClassList = classNames(icon, 'icon');
  const wrapperClassList = classNames('ui', color, 'labeled icon button', className);

  return (
    <div role="presentation" className={wrapperClassList} onKeyPress={onClick} onClick={onClick}>
      {children}
      <i className={iconClassList} />
    </div>
  );
};

/**
  * @name ButtonWithIcon propTypes
  * @type {propTypes}
  *
  * @param {Object} props - React PropTypes
  *
  * @property {string} icon - the semantic-ui icon name to use
  * @property {string} className - list of classes to add to the button
  * @property {string} color - color to apply to button
  * @property {Node} children - children nodes
  * @property {Function} onClick - handler to call on function click
  *
  */
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
