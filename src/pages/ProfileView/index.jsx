// react libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// jwt third party library
import jwt from 'jsonwebtoken';

// utils
import connect from 'utils/connect';

// actions
import { requestProfileSuccess } from 'modules/profile';

// assets
import './ProfileView.scss';
import imagePlaceholder from '../../assets/images/imagePlaceholder.svg';

/**
 * View profile page for individual Icon
 *
 */
export class ViewProfile extends Component {
/**
* @name ViewProfile propTypes
* @type {propTypes}
*
* @param {Object} props - React PropTypes
*
* @property {Function} onSubmit - handles form submit
* @property {Function} onchange - handles input changes
* @property {Function} onclick - handles input submit
*
*/
  static propTypes = {
    requestProfileSuccess: PropTypes.func.isRequired,
    profile: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  componentDidMount() {
    const { id } = jwt.decode(localStorage.getItem('token'));
    const { requestProfileSuccess: requestProfile } = this.props;
    requestProfile(id);
  }

  /**
  * Navigates the view profile to edit profile
  * @method
  *
  * @return {void}
  */
  editPage = () => {
    const { history } = this.props;
    history.push('/profile/update');
  };

  /**
  * get the Published component
  * @method
  *
  * @return {void}
  */
  getPublished = () => {
    // render the getPublished  component
  };

  /**
  * get the users bookmark
  * @method
  *
  * @return {void}
  */
  getBookmark = () => {
    // render the bookmark  component
  };

  /**
   * get the users draft
   * @method
   *
   * @return {void}
   */
  getDraft = () => {
    // render the draft  component
  };

  render() {
    const { profile } = this.props;

    return (
      <div className="profile-container">
        <div className="profile-container__header">
          <div className="profile-container__mini-header" />
          <div className="profile-container__image ">
            <img
              src={profile.data.avatarUrl || imagePlaceholder}
              className="profile-container__image-preview"
              id="profileImg"
              alt=""
            />
          </div>
          <div className="profile-container__name">
            <p id="userName">
              {' '}
              {`${profile.data.firstName} ${profile.data.lastName}`}
            </p>
          </div>
          <div className="profile-container__bio" id="bio">
            <p>{profile.data.bio}</p>
          </div>
          <div className="profile-container__social-detail">
            <div className="profile-container__edit">
              <button
                type="submit"
                onClick={this.editPage}
                className="ui inverted orange button"
              >
                Edit Profile
              </button>
            </div>
          </div>
          <div className="profile-container-link">
            <button
              type="submit"
              onClick={this.getPublished}
              className="profile-container-link__published"
            >
              Published
            </button>
            <button
              type="submit"
              onClick={this.getBookmark}
              className="profile-container-link__bookmark"
            >
              Bookmarks
            </button>
            <button
              type="submit"
              onClick={this.getDraft}
              className="profile-container-link__drafts"
            >
              Drafts
            </button>
          </div>
        </div>
        <div className="profile-container__response">
          Response from Bookmarks,
        </div>
      </div>
    );
  }
}

export default connect({ requestProfileSuccess })(ViewProfile);
