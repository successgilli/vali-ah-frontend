// react libraries
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => (
  <div>
    <Link to="/">
      1kbIdeas
    </Link>
    <div>
      <Link to="/">
        All Stories
      </Link>
      <Link to="/login">
        Login
      </Link>
    </div>
  </div>
);

export default Header;
