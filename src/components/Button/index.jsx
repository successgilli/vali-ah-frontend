import * as React from 'react';

import * as PropTypes from 'prop-types';

const Button = ({
  children, id, className, handleClick
}) => (
  <button id={id} className={className} onClick={handleClick} type="button">
    {children}
  </button>
);

Button.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired,
  id: PropTypes.string,
  className: PropTypes.string.isRequired,
  handleClick: PropTypes.func.isRequired
};

Button.defaultProps = {
  id: ''
};

export default Button;
