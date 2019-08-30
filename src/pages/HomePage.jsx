// react libraries
import React, { Component } from 'react';

// utils
import connect from 'utils/connect';

import Header from '../components/Header';
import HeroSection from '../components/HeroSection';

/**
 * @exports
 * @class HomePage
 * @extends Component
 * @classdesc Creates HomePage Component
 *
 * @returns {JSX} HomePage Component
 */
class HomePage extends Component {
  static propTypes = {
    requestDemo: PropTypes.func.isRequired,
  }

  componentDidMount() {

  }

  render() {
    return (
      <>
        <Header />
        <HeroSection />
      </>
    );
  }
}

export default connect({ })(HomePage);
