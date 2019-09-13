// react libraries
import React from 'react';
import PropTypes from 'prop-types';

// components
import Signin from 'components/Signin';
import Signup from 'components/Signup';
import SocialLoginButtons from 'components/SocialLoginButtonRow';

import './Modal.scss';

export class ModalComponent extends React.Component {
  /**
    * @name Modal propTypes
    * @type {propTypes}
    *
    * @param {Object} props - React PropTypes
    *
    * @property {Boolean} formTypes - toggles (false)signup or (true)signin form
    * @property {Boolean} show - determines if modal should show or not
    *
    */
  static propTypes = {
    formType: PropTypes.bool.isRequired,
    show: PropTypes.bool.isRequired
  };

  static getDerivedStateFromProps(props, { close }) {
    const { show, formType } = props;

    return { show: (show && !close), close: false, signin: formType === 'login' };
  }

  constructor(props) {
    super(props);
    const { formType, show } = this.props;
    this.state = {
      signin: formType === 'login',
      show
    };
  }

  /**
    * Handles change form display action
    * @method
    *
    * @return {void}
    */
  handleFormChange = () => {
    const { formType } = this.props;
    const { signin } = this.state;
    this.setState({ signin: !signin && formType === 'login' });
  }

  /**
    * Handles close modal action
    * @method
    *
    * @return {void}
    */
  handleClose = () => {
    this.setState({ show: false, close: true });
  }

  render() {
    const { signin, show, close } = this.state;
    return (
      <div className={(show && !close) ? 'modal modal--show' : 'modal modal--hide'}>
        <div className="modal__modal-content">
          <button className="modal__close" type="button" onClick={this.handleClose}>&#x2715;</button>
          {
            signin && (
              <div className="modal__left">
                <h2 className="modal__head">Share your stories</h2>
                <h1 className="modal__welcome">Welcome back</h1>
                <p className="modal__text">Sign into your account to serve you more personalised stories from creatives</p>
              </div>
            )
          }
          {
            !signin && (
              <div className="modal__left">
                <h2 className="modal__head">Share your stories</h2>
                <h1 className="modal__welcome">Create your free account</h1>
                <p className="modal__text">Sign into your account to serve you more personalised stories from creatives</p>
              </div>
            )
          }
          <div className="modal__right">
            <h4 className="modal__heading">Select one to get started</h4>
            <div className="modal__social-login">
              <SocialLoginButtons />
            </div>
            <div className="modal__seperator">
              <p>or</p>
            </div>
            <div className="modal__auth-component">
              { signin
                && <Signin />}
              {
                !signin && (
                  <div className="modal__social-login">
                    <Signup />
                  </div>
                )
              }
              <div className="modal__setup-tag">
                <p>
                  {(signin) && 'Don\'t have an account ?'}
                  {(!signin) && 'Already have an account ?'}
                  <button type="button" className="modal__create-account" onClick={this.handleFormChange}>{(signin) ? 'Sign up' : 'Sign in'}</button>
                </p>
                { signin && (
                  <p>
                    Forgot your password ? &nbsp;
                    <span className="modal__create-account">Reset password</span>
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ModalComponent;
