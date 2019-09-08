// react libraries
import React from 'react';
import PropTypes from 'prop-types';

// styles
import './Button.scss';


const Button = ({
  text,
  type,
  onClick,
  classname
}) => (
  // eslint-disable-next-line react/button-has-type
  <button
    type={type}
    onClick={onClick}
    className={classname ? `button__${classname}` : 'button__primary'}
  >
    {text}
  </button>
);

Button.propTypes = {
  type: PropTypes.string.isRequired,
  classname: PropTypes.isRequired,
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired
};

export default Button;
