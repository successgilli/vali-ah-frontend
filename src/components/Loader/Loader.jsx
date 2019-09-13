import React from 'react';
import { ClipLoader } from 'react-spinners';

// third-party libraries
import PropTypes from 'prop-types';

const Loader = ({ size, color }) => (
  <ClipLoader
    css={{ display: 'block', margin: 'auto' }}
    size={size}
    color={color || '#FD8234'}
  />
);

Loader.propTypes = {
  size: PropTypes.number.isRequired,
  color: PropTypes.string.isRequired,
};
export default Loader;
