import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ caption }) => (
  <div className="spinner">
    <img
      src="https://loading.io/spinners/comets/index.comet-spinner.svg"
      alt="Spinner"
    />
    <p>{caption}</p>
  </div>
);

Spinner.propTypes = {
  caption: PropTypes.string.isRequired
};

export default Spinner;
