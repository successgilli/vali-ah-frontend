// react library
import React from 'react';

// components
import FacebookShareButton from './FacebookShareButton';
import TwitterShareButton from './TwitterShareButton';
import EmailShareButton from './EmailShareButton';


const renderSocialShareBtn = (name) => {
  const baseUrl = 'money.com';
  const bigData = {
    match: {
      url: '/articles'
    },
    article: {
      data: {
        title: 'a title',
        Author: {
          firstName: 'John',
          lastName: 'Doe'
        }
      }
    }
  };

  if (name === 'facebook') {
    return shallow(<FacebookShareButton baseUrl={baseUrl} bigData={bigData} />);
  }
  if (name === 'twitter') {
    return shallow(<TwitterShareButton baseUrl={baseUrl} bigData={bigData} />);
  }
  if (name === 'email') {
    return shallow(<EmailShareButton baseUrl={baseUrl} bigData={bigData} />);
  }
  return null;
};

describe('Social Login Buttons', () => {
  describe('Facebook share Button', () => {
    it('facebook button should render properly', () => {
      const facebookBtn = renderSocialShareBtn('facebook');

      expect(facebookBtn.find('img')).toHaveLength(1);
      expect(facebookBtn.find('Button')).toHaveLength(1);
    });

    it('facebook button should NOT render properly', () => {
      const facebookLoginBtn = shallow(<facebookShareButton />);

      expect(facebookLoginBtn.props().requestFetchArticle).toBe(undefined);
    });

    it('facebook button should be clickable', () => {
      const facebookBtn = renderSocialShareBtn('facebook');

      facebookBtn.simulate('click');
    });
  });

  describe('twitter share button', () => {
    it('twitter button should render properly', () => {
      const twitterBtn = renderSocialShareBtn('twitter');

      expect(twitterBtn.find('img')).toHaveLength(1);
      expect(twitterBtn.find('Button')).toHaveLength(1);
    });

    it('twitter button should NOT render properly', () => {
      const twitterLoginBtn = shallow(<TwitterShareButton />);

      expect(twitterLoginBtn.props().requestFetchArticle).toBe(undefined);
    });

    it('twitter button should be clickable', () => {
      const twitterBtn = renderSocialShareBtn('twitter');

      twitterBtn.simulate('click');
    });
  });

  describe('email share button', () => {
    it('email button should render properly', () => {
      const emailBtn = renderSocialShareBtn('email');

      expect(emailBtn.find('img')).toHaveLength(1);
      expect(emailBtn.find('Button')).toHaveLength(1);
    });

    it('email button should NOT render properly', () => {
      const emailBtn = shallow(<EmailShareButton />);

      expect(emailBtn.props().requestFetchArticle).toBe(undefined);
    });

    it('email button should be clickable', () => {
      const emailBtn = renderSocialShareBtn('email');

      emailBtn.simulate('click');
    });
  });
});
