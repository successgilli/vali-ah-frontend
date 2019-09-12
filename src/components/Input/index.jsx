// react libraries
import React from 'react';
import PropTypes from 'prop-types';

// styles
import './Input.scss';

const Input = ({
  type,
  name,
  placeholder,
  onChange,
}) => (
  <label htmlFor={name} className="input__label">
    <input
      type={type || 'text'}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
      className="input__field"
      required={'required' || false}
    />
  </label>
);

Input.propTypes = {
  name: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

export default Input;
