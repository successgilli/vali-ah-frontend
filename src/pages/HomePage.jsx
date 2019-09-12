
// react libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// utils
import connect from 'utils/connect';
import Modal from 'components/Modal';

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
    header: PropTypes.func.isRequired
  };

  componentDidMount() {

  }

  render() {
    const { header: { activateModal } } = this.props;
    return (
      <>
        <Modal show={!!activateModal} />
        <h1>Welcome to 1kbIdeas</h1>
      </>
    );
  }
}

export default connect({ })(HomePage);
