// react libraries
import React from 'react';

// third-party libraries
import PropTypes from 'prop-types';

// sagas (action creators)
import { socialAuthRequest } from 'modules/socialLogin';

// helper functions
import connect from 'utils/connect';

// components
import GoogleLoginButton from './GoogleLoginButton';
import FacebookLoginButton from './FacebookLoginButton';

// styles
import './SocialLoginButtons.scss';

export const SocialLoginButtonRow = ({ socialAuthRequest: socialAuthApiRequest }) => (
  <div className="social-login-button-row">
    <GoogleLoginButton socialAuthRequest={socialAuthApiRequest} />
    <FacebookLoginButton socialAuthRequest={socialAuthApiRequest} />
  </div>
);

SocialLoginButtonRow.propTypes = {
  socialAuthRequest: PropTypes.func.isRequired
};

export default connect({ socialAuthRequest })(SocialLoginButtonRow);
