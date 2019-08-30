// react libraries
import React from 'react';
import { withRouter } from 'react-router-dom';

// third-party libraries
import PropTypes from 'prop-types';

// components
import Button from 'components/Button';

// import styles
import './SocialLoginButtons.scss';
import googleLogo from 'assets/images/google-g.svg';

const { useEffect } = React;

export const GoogleLoginButtonComponent = ({ socialAuthRequest, history }) => {
  let auth2;

  const attachSignIn = (element) => {
    auth2.attachClickHandler(element, {},
      (googleUser) => {
        const { id_token: accessToken } = googleUser.getAuthResponse();
        socialAuthRequest(accessToken, 'google');
        history.push('/feed');
      }, (error) => {
        throw error;
      });
  };

  const startApp = () => {
    window.gapi.load('auth2', () => {
      auth2 = window.gapi.auth2.init({
        client_id: process.env.GOOGLE_CLIENT_ID,
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });

      attachSignIn(document.getElementById('custom-btn'));
    });
  };

  useEffect(() => {
    startApp();
  }, []);

  return (
    <Button id="custom-btn" className="social-login-button" onClick={() => {}} type="button">
      <img src={googleLogo} alt="google Logo" />
    </Button>
  );
};

GoogleLoginButtonComponent.propTypes = {
  socialAuthRequest: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired
  }).isRequired
};

export default withRouter(GoogleLoginButtonComponent);
