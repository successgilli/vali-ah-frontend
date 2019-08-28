// react libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// sagas (action creators)
import { requestDemo } from 'modules/demo';

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
  static propTypes = {
    demo: PropTypes.string.isRequired,
    requestDemo: PropTypes.func.isRequired,
  }

  componentDidMount() {
    const { requestDemo: boundRequestDemo } = this.props;
    boundRequestDemo();
  }

  render() {
    const { demo } = this.props;

    return (
      <h1>
        {demo}
      </h1>
    );
  }
}

export default connect({ requestDemo })(HomePage);
