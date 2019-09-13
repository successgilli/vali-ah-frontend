// react libraries
import React from 'react';

// third-party libraries
import { Link } from 'react-router-dom';

// style
import './ShareStory.scss';

/**
 * Component for shareStory card
 * @summary it creates the component that links the user to the page for creating articles
 */
const ShareStory = () => (
  <Link to="/article" className="share-story">
    <div className="share-story__text">
        Share your story...
    </div>
    <img className="share-story__image" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSoLXTpv0URjl0NTVXoHIKJimWXKu7RoMeENHB2jRBqX3C_Aa7Ktg" alt="" />
  </Link>
);

export default ShareStory;
