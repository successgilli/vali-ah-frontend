import React from 'react';

import PropTypes from 'prop-types';

import './Icon.scss';

/**
 * Base component for individual Icon
 *
 */
export default class Icon extends React.Component {
  /**
    * @name Icon propTypes
    * @type {propTypes}
    *
    * @param {Object} props - React PropTypes
    *
    * @property {string} icon - icon type to render based on the css
    * @property {Function} clickHandler - handles icon click and keypress event
    * @property {Boolean} active - determines if icon is active
    *
    */
  static propTypes = {
    icon: PropTypes.string.isRequired,
    clickHandler: PropTypes.func.isRequired,
    active: PropTypes.bool
  }

  static defaultProps = {
    active: false
  }

  /**
    * Handles icon click event and calls the attach clicked handler
    * @method
    *
    * @return {void}
    */
  onClickHandler = () => {
    const { clickHandler, ...otherProps } = this.props;

    clickHandler(otherProps);
  };

  render() {
    const { icon, active } = this.props;
    return (
      <button type="button" aria-label={icon} className={`icon icon--${icon} ${active && 'active'}`} onClick={this.onClickHandler} onKeyDown={this.onClickHandler} />
    );
  }
}
