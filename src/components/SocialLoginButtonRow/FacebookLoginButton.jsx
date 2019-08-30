// react libraries
import React from 'react';
import { withRouter } from 'react-router-dom';

// third-party libraries
import PropTypes from 'prop-types';

// components
import Button from 'components/Button';

// styles
import './SocialLoginButtons.scss';
import facebookLogo from 'assets/images/f_logo_RGB-Blue_72.png';

export const FacebookLoginButtonComponent = ({ socialAuthRequest, history }) => {
  const statusChangeCallback = (response) => {
    if (response.status === 'connected') {
      const { accessToken } = response.authResponse;
      socialAuthRequest(accessToken, 'facebook');
      history.push('/feed');
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

FacebookLoginButtonComponent.propTypes = {
  socialAuthRequest: PropTypes.func.isRequired,
  history: PropTypes.shape({
    push: PropTypes.func
  }).isRequired
};

export default withRouter(FacebookLoginButtonComponent);
