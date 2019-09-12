import React from 'react';

import PropTypes from 'prop-types';

import './ScrollToTopButton.scss';

import scrollToTopIcon from '../../assets/images/scroll-up.svg';

const ScrollToTopButton = ({ loaded, modalShow }) => (
  <footer className="scroll-up-wrapper">
    { loaded && modalShow && (
      <nav className="scroll-up-wrapper__scroll-up-button">
        <a href="/#"><img src={scrollToTopIcon} alt="scroll to top button" /></a>
      </nav>
    ) }
  </footer>
);


ScrollToTopButton.propTypes = {
  loaded: PropTypes.bool.isRequired,
  modalShow: PropTypes.bool.isRequired
};

export default ScrollToTopButton;
