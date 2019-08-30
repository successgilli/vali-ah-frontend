import React from 'react';

import './HeroSection.scss';

import JoinButton from '../JoinButton';
import SigninButton from '../SigninButton';

const HeroSection = () => (
  <section className="heroSection">
    <div className="leftHero">
      <h1> The one-stop shop for all the self-help ideas you need </h1>
      <p> Write and share your stories </p>
      <div className="buttonWrapper">
        <JoinButton />
        <SigninButton />
      </div>
    </div>
    <div className="rightHero">
      <img src="./src/assets/images/HeroImage.jpg" alt="1kbIdeas community" className="imageWidth" />
    </div>
  </section>
);

export default HeroSection;
