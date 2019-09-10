// react libraries
import React from 'react';
import PropTypes from 'prop-types';

// styles
import './LinkButton.scss';


const LinkButton = ({
  text,
  onClick,
  className
}) => (
  <button
    type="button"
    value={text}
    onClick={onClick}
    className={className}
  >
    {text}
  </button>
);

LinkButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  className: PropTypes.string.isRequired
};

export default LinkButton;
