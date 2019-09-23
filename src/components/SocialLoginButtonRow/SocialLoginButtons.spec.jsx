/* eslint-disable import/no-named-as-default */
import React from 'react';

import { FacebookLoginButtonComponent } from './FacebookLoginButton';
import { GoogleLoginButtonComponent } from './GoogleLoginButton';
import { SocialLoginButtonRow } from './index';

function renderSocialLoginBtn(provider, args) {
  const defaultProps = {
    socialAuthRequest: jest.fn(),
    history: {
      push: jest.fn()
    }
  };
  const props = { ...defaultProps, ...args };
  if (provider === 'facebook') {
    return mount(<FacebookLoginButtonComponent {...props} />);
  }
  if (provider === 'google') {
    return mount(<GoogleLoginButtonComponent {...props} />);
  }
  return null;
}

global.FB = {};
global.gapi = {};

beforeEach(() => {
  global.FB.login = jest.fn();
  global.FB.getLoginStatus = jest.fn((cb) => {
    const res = {
      status: 'connected',
      authResponse: { access_token: 'theAccessToken' }
    };
    cb(res);
  });
  global.gapi.load = jest.fn();
});

describe('Social Login Buttons', () => {
  describe('Facebook login Button', () => {
    it('facebook button Should render properly', () => {
      const facebookBtn = renderSocialLoginBtn('facebook');

      expect(facebookBtn.find('img')).toHaveLength(1);
      expect(facebookBtn.find('Button')).toHaveLength(1);
    });

    it('facebook button should NOT render properly if required props is not passed', () => {
      const facebookLoginBtn = shallow(<FacebookLoginButtonComponent />);

      expect(facebookLoginBtn.props().socialAuthRequest).toBe(undefined);
    });

    it('should dispatch action creator if user confirms sign in', () => {
      const facebookBtn = renderSocialLoginBtn('facebook');
      facebookBtn.simulate('click');

      expect(global.FB.login).toBeCalled();
      expect(facebookBtn.props().socialAuthRequest).toBeCalled();
    });

    it('should not dispatch action creator if user does not confirm sign in', () => {
      const facebookBtn = mount(<FacebookLoginButtonComponent socialAuthRequest={jest.fn()} />);
      global.FB.getLoginStatus = jest.fn((cb) => {
        const res = {
          status: 'disconnected',
          authResponse: { access_token: 'theAccessToken' }
        };
        cb(res);
      });

      facebookBtn.simulate('click');
      expect(facebookBtn.props().socialAuthRequest).not.toBeCalled();
    });
  });

  describe('google login button', () => {
    it('google button should render properly', () => {
      const googleBtn = renderSocialLoginBtn('google');

      expect(googleBtn.find('img')).toHaveLength(1);
      expect(googleBtn.find('Button')).toHaveLength(1);
    });

    it('google button should NOT render properly', () => {
      const googleLoginBtn = shallow(<GoogleLoginButtonComponent />);

      expect(googleLoginBtn.props().socialAuthRequest).toBe(undefined);
    });

    it('socialLoginButtonRow should render properly', () => {
      const socialLoginBtnRow = shallow(<SocialLoginButtonRow socialAuthRequest={() => { }} />);

      expect(socialLoginBtnRow.find('div')).toHaveLength(1);
      expect(socialLoginBtnRow.find('div').hasClass('social-login-button-row')).toBe(true);
    });

    it('should call google auth function ', () => {
      const googleBtn = renderSocialLoginBtn('google');

      googleBtn.simulate('click');
    });
  });
});
