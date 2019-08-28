// react libraries
import React from 'react';
import { Link } from 'react-router-dom';

import 'scss/style.scss';

const Header = () => (
  <div>
    <Link to="/">
      <h5 className="red">1kbIdeas</h5>
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
