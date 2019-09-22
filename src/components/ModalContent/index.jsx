// react library
import React from 'react';

import propTypes from 'prop-types';

// styles
import './ModalContent.scss';

/**
 * Component to render modal component
 */
export class ModalContent extends React.Component {
  /**
    * @name ModalContent propTypes
    * @type {propTypes}
    *
    * @param {Object} props - React PropTypes
    *
    * @property {Boolean} handleClose - function that closes modal onClick
    * @property {Boolean} child - node wrapped in parent Modal component
    *
    */
static propTypes = {
  handleClose: propTypes.func.isRequired,
  child: propTypes.arrayOf(
    propTypes.shape({})
  ).isRequired
}

constructor(props) {
  super(props);
  this.state = {};
}

render() {
  const { handleClose, child } = this.props;

  return (
    <div className="modal-content">
      <button className="modal-content__close" type="button" onClick={handleClose}>&#x2715;</button>
      <div className="modal-content__wrapper">
        {child}
      </div>
    </div>
  );
}
}

export default ModalContent;
