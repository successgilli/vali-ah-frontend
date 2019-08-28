// react libraries
import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ children }) => (<button type="button">{children}</button>);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default Button;
