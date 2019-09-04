// react libraries
import * as React from 'react';

// third-party libraries
import * as PropTypes from 'prop-types';

// components
import Button from 'components/Button';

// styles
import './SocialShareButtons.scss';

const EmailShareButton = ({ baseUrl, bigData }) => {
  const handleClick = () => {
    const {
      match: { url },
      article: {
        data: {
          title, Author: { firstName, lastName }
        }
      }
    } = bigData;

    // eslint-disable-next-line no-console
    console.log('data: ', bigData);

    const siteUrl = `${baseUrl}${url.substr(1)}`;
    const subject = `An article from 1kbIdeas: ${title} by @${firstName}${lastName}`;
    const body = `${title} by @${firstName}${lastName}: ${siteUrl}`;
    window.location.href = `mailto:?subject=${subject}&body=${body}`;
  };

  return (
    <Button className="social-share-buttons__email" handleClick={handleClick}>
      <img className="social-share-buttons__button-image" src="../../src/assets/images/email-icon.svg" alt="twitter Logo" />
    </Button>
  );
};

EmailShareButton.propTypes = {
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

export default EmailShareButton;
