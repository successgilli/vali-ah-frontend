// react libraries
import * as React from 'react';

// third-party libraries
import * as PropTypes from 'prop-types';

// components
import Button from 'components/Button';

// styles
import './SocialShareButtons.scss';

const FacebookShareButton = ({ baseUrl, bigData }) => {
  const handleClick = () => {
    const { match } = bigData;
    const { url } = match;
    const siteUrl = `${baseUrl}${url.substr(1)}`;
    const facebookurl = `https://www.facebook.com/sharer/sharer.php?u=${siteUrl}`;
    window.open(facebookurl, 'share-facebook', 'width=580,height=400');
  };

  return (
    <Button className="social-share-buttons__facebook" handleClick={handleClick}>
      <img className="social-share-buttons__button-image" src="./../src/assets/images/facebook-icon.svg" alt="facebook Logo" />
    </Button>
  );
};

FacebookShareButton.propTypes = {
  baseUrl: PropTypes.string.isRequired,
  bigData: PropTypes.shape({
    match: PropTypes.shape({
      url: PropTypes.string
    }),
  }).isRequired
};

export default FacebookShareButton;
