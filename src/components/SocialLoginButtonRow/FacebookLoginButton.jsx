// react libraries
import * as React from 'react';

// third-party libraries
import * as PropTypes from 'prop-types';

// components
import Button from 'components/Button';

// styles
import './SocialLoginButtons.scss';
import facebookLogo from 'assets/images/f_logo_RGB-Blue_72.png';

const FacebookLoginButton = ({ socialAuthRequest }) => {
  const statusChangeCallback = (response) => {
    if (response.status === 'connected') {
      const { accessToken } = response.authResponse;
      socialAuthRequest(accessToken, 'facebook');
    }
  };

  const checkLoginState = () => {
    window.FB.getLoginStatus((response) => {
      statusChangeCallback(response);
    });
  };

  const handleClick = () => {
    window.FB.login(checkLoginState());
  };

  return (
    <Button className="social-login-button" onClick={handleClick} type="button">
      <img src={facebookLogo} alt="facebook Logo" />
    </Button>
  );
};

FacebookLoginButton.propTypes = {
  socialAuthRequest: PropTypes.func.isRequired
};

export default FacebookLoginButton;
