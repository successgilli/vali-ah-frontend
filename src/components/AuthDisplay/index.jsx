// react libraries
import React from 'react';

// components
import Signin from 'components/Signin';

// styles
import './AuthDisplay.scss';

/**
 * Component for authentication content
 * @summary it toggles between user signup and user signin
 */
export class AuthDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  /**
    * Handles form toggle
    * @method
    *
    * @param {Object} formType - form to render
    *
    * @return {void}
    */
  handleFormChange = (formType) => {
    this.setState({ formType });
  }

  /**
    * Handles text to render on the forms
    * @method
    *
    * @param {Object} formType - form beign rendered
    *
    * @return {node}
    */
  renderModalText = (formType) => (
    <div>
      <h2 className="auth-display__head">Share your stories</h2>
      <h1 className="auth-display__welcome">{(formType === 'signin') ? 'Welcome back' : 'Create your free account'}</h1>
      <p className="auth-display__text">{(formType === 'signin') ? 'Sign into your account to serve you more personalised stories from creatives' : 'We’ll need your details for setting up your account to serve you more personalized stories from creatives.'}</p>
    </div>
  );

  /**
    * renders appropraite form based on input
    * @method
    *
    * @param {Object} formType - form requested
    *
    * @return {node}
    */
  renderModalForm = (formType) => {
    if (formType === 'signin') {
      return <Signin />;
    }
    return (
      <div className="auth-display__social-login">
            JONATUS COMPONENT
      </div>
    );
  }

  /**
    * renders appropraite links based of form displayed
    * @method
    *
    * @param {Object} formType - form requested
    *
    * @return {node}
    */
  renderModalLinks = (formType) => {
    if (formType === 'signin') {
      return (
        <p>
          <span>Don`t have an account ?</span>
          <button type="button" className="auth-display__create-account" onClick={() => this.handleFormChange('signup')}>signup</button>
          <p>
            <span>Forgot your password ? &nbsp;</span>
            <span className="auth-display__create-account">Reset password</span>
          </p>
        </p>
      );
    }
    return (
      <p>
        <p>Already have an account ? </p>
        <button type="button" className="auth-display__create-account" onClick={() => this.handleFormChange('signin')}>signin</button>
      </p>
    );
  }

  render() {
    const { formType } = this.state;
    return (
      <div className="auth-display">
        <div className="auth-display__left">
          {this.renderModalText(formType)}
        </div>
        <div className="auth-display__right">
          <h4 className="auth-display__heading">Select one to get started</h4>
          <div className="auth-display__social-login">
            IBUKUN COMPONENT
          </div>
          <div className="auth-display__seperator">
            <p>or</p>
          </div>
          <div className="auth-display__auth-component">
            {this.renderModalForm(formType)}
            <div className="auth-display__setup-tag">
              {this.renderModalLinks(formType)}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AuthDisplay;
