// react libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// utils
import classNames from 'utils/classnames';

// styles
import './Icon.scss';

/**
 * Base component for individual Icon
 *
 */
export default class Icon extends Component {
  /**
    * @name Icon propTypes
    * @type {propTypes}
    *
    * @param {Object} props - React PropTypes
    *
    * @property {string} icon - icon type to render based on the css
    * @property {Function} onClick - handles icon click and keypress event
    * @property {Boolean} active - determines if icon is active
    *
    */
  static propTypes = {
    icon: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
    active: PropTypes.bool
  }

  static defaultProps = {
    active: false
  }

  /**
    * Handles icon click event and calls the attached clicked handler
    * @method
    *
    * @return {void}
    */
  clickHandler = () => {
    const { onClick } = this.props;

    onClick();
  };

  render() {
    const { icon, active } = this.props;
    const classes = classNames({
      icon: true,
      [`icon--${icon}`]: true,
      'icon--active': active
    });

    return (
      <button
        type="button"
        aria-label={icon}
        className={classes}
        onClick={this.clickHandler}
        onKeyDown={this.clickHandler}
      />
    );
  }
}
