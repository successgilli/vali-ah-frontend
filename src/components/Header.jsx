// react libraries
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import connect from 'utils/connect';

// modules
import { activateModal } from 'modules/header';

import 'scss/style.scss';

const Header = ({ activateModal: activateModalDispatch }) => (
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
      <button type="button" id="signup" onClick={() => activateModalDispatch('login')}>
        Signup
      </button>
    </div>
  </div>
);

Header.propTypes = {
  activateModal: PropTypes.func.isRequired,
};

export default connect({ activateModal })(Header);
