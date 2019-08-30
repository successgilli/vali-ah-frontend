// react libraries
import * as React from 'react';

// third-party libraries
import * as PropTypes from 'prop-types';

// components
import Button from 'components/Button';

// import styles
import './SocialLoginButtons.scss';
import googleLogo from 'assets/images/google-g.svg';

const { useEffect } = React;

const GoogleLoginButton = ({ socialAuthRequest }) => {
  let auth2;

  const attachSignIn = (element) => {
    auth2.attachClickHandler(element, {},
      (googleUser) => {
        const { id_token: accessToken } = googleUser.getAuthResponse();
        socialAuthRequest(accessToken, 'google');
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

GoogleLoginButton.propTypes = {
  socialAuthRequest: PropTypes.func.isRequired
};

export default GoogleLoginButton;
