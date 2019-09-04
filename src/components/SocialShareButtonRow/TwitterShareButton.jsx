/* eslint-disable react/prop-types */
// react libraries
import * as React from 'react';

// third-party libraries
import * as PropTypes from 'prop-types';

// components
import Button from 'components/Button';

// styles
import './SocialShareButtons.scss';

const TwitterShareButton = ({ baseUrl, bigData }) => {
  const handleClick = () => {
    const {
      match: { url },
      article: {
        data: {
          title, Author: { firstName, lastName }
        }
      }
    } = bigData;

    const text = `${title} by @${firstName}${lastName}`;
    const siteUrl = `${baseUrl}${url.substr(1)}`;
    const twitterUrl = `https://twitter.com/intent/tweet/?text=${text}&amp;url=${siteUrl}`;
    window.open(twitterUrl, 'share-twitter', 'width=580,height=400');
  };

  return (
    <Button className="social-share-buttons__twitter" handleClick={handleClick}>
      <img className="social-share-buttons__button-image" src="../../src/assets/images/twitter-icon.svg" alt="twitter Logo" />
    </Button>
  );
};

TwitterShareButton.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  bigData: PropTypes.shape({
    match: PropTypes.shape({
      url: PropTypes.string
    }),
    article: PropTypes.shape({
      data: PropTypes.shape({
        title: PropTypes.string,
        Author: PropTypes.shape({
          firstName: PropTypes.string,
          lastName: PropTypes.string
        })
      })
    })
  }).isRequired,
};

export default TwitterShareButton;
