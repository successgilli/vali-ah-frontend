import * as React from 'react';

import * as PropTypes from 'prop-types';

// styles
import './Button.scss';

const Button = ({
  children, id, className, onClick, type = 'button'
}) => (
  // eslint-disable-next-line react/button-has-type
  <button
    id={id}
    className={className || 'button__primary'}
    onClick={onClick}
    type={type}
  >
    {children}
  </button>
);

Button.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  id: PropTypes.string,
  className: PropTypes.string.isRequired
};

Button.defaultProps = {
  id: ''
};

export default Button;
