// react library
import React, { Component } from 'react';

// components
import Navbar from 'components/Header';


/**
 * @exports
 * @class HomePage
 * @extends Component
 * @classdesc Creates HomePage Component
 *
 * @returns {JSX} HomePage Component
 */
class HomePage extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Navbar />
        <h1>Welcome to 1kbIdeas</h1>
      </div>
    );
  }
}
export default HomePage;
