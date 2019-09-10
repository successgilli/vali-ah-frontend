// react libraries
import React from 'react';
import PropTypes from 'prop-types';

// Search scss
import './Search.scss';

const Search = ({ searchkeyUp, changeValue, searchValue }) => (
  <input
    type="text"
    className="search"
    placeholder="Search for articles"
    onKeyUp={searchkeyUp}
    onChange={changeValue}
    value={searchValue}
    required
  />
);

Search.propTypes = {
  searchkeyUp: PropTypes.func.isRequired,
  changeValue: PropTypes.func.isRequired,
  searchValue: PropTypes.string
};

Search.defaultProps = {
  searchValue: ''
};

export default Search;
