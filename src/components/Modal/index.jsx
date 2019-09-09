// react libraries
import React from 'react';
import PropTypes from 'prop-types';

// components
import ModalContentComponent from 'components/ModalContent';

// styles
import './Modal.scss';

/**
 * Component to render modal popup
 */
export class ModalComponent extends React.Component {
  /**
    * @name Modal propTypes
    * @type {propTypes}
    *
    * @param {Object} props - React PropTypes
    *
    * @property {Boolean} show - determines if modal should show or not
    * @property {Boolean} children - node wrapped in Modal component
    *
    */
  static propTypes = {
    show: PropTypes.bool.isRequired,
    children: PropTypes.node.isRequired
  };

  constructor(props) {
    super(props);
    const { show } = this.props;
    this.state = {
      show
    };
  }

  /**
    * Handles close modal action
    * @method
    *
    * @return {void}
    */
  handleClose = () => {
    this.setState({ show: false });
  }

  render() {
    const { show } = this.state;
    const { children } = this.props;
    return (
      <div className={(show) ? 'modal modal--show' : 'modal modal--hide'}>
        <ModalContentComponent handleClose={this.handleClose} child={children} />
      </div>
    );
  }
}

export default ModalComponent;
