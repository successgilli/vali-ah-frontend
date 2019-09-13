import React from 'react';

import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import connect from 'utils/connect';

import Button from 'components/Button';

import { activateModal } from 'modules/header';

import './Header.scss';

import logo from '../../assets/images/1KbIdeas.svg';

const Header = ({ activateModal: activateModalDispatch }) => (
  <header className="header">
    <Link to="/">
      <img src={logo} className="header__logo" alt="1kbIdeas logo" />
    </Link>
    <div>
      <input type="text" className="header__search" placeholder="Search for articles" />
    </div>
    <nav className="header__nav-link">
      <Button type="button" id="signup" className="header__nav-link" onClick={() => activateModalDispatch({ formType: 'login' })}>
       Signin
      </Button>
      <Button type="button" id="signup" className="header__nav-link" onClick={() => activateModalDispatch({ formType: 'signup' })}>
       Signup
      </Button>
    </nav>
  </header>
);

Header.propTypes = {
  activateModal: PropTypes.func.isRequired,
};

export default connect({ activateModal })(Header);
