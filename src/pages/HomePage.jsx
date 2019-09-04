// react libraries
import React, { Component } from 'react';

// utils
import connect from 'utils/connect';

/**
 * @exports
 * @class HomePage
 * @extends Component
 * @classdesc Creates HomePage Component
 *
 * @returns {JSX} HomePage Component
 */
class HomePage extends Component {
  componentDidMount() {

  }

  render() {
    return (
      <>
        <h1>Welcome to 1kbIdeas</h1>
      </>
    );
  }
}

export default connect({ })(HomePage);
