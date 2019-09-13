// react libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

// utils
import connect from 'utils/connect';
import isAuthenticated from 'utils/auth';

// actions
import { getProfileRequest } from 'modules/profile';

// assets
import './ProfileView.scss';
import imageplaceholder from 'assets/images/image-placeholder.svg';

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
    getProfileRequest: PropTypes.func.isRequired,
    profile: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      active: 'published',
    };
  }

  componentDidMount() {
    const { id } = isAuthenticated();
    const { getProfileRequest: getgetProfileRequest } = this.props;
    getgetProfileRequest(id);
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
   * get the response component
   * @method
   *
   * @return {void}
   */
  getResponse = (response) => {
    this.setState({
      active: response,
    });
  };

  render() {
    const { profile } = this.props;
    const { active } = this.state;
    const { isExpired } = isAuthenticated();
    const page = !isExpired ? (
      <div className="profile-container">
        <div className="profile-container__header">
          <div className="profile-container__mini-header" />
          <div className="profile-container__image ">
            <img
              src={profile.data.avatarUrl || imageplaceholder}
              className="profile-container__image-preview-view"
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
              onClick={() => this.getResponse('published')}
              className={`profile-container-link__published ${active
                === 'published' && ' profile-active'}`}
            >
              Published
            </button>
            <button
              type="submit"
              onClick={() => this.getResponse('bookmark')}
              className={`profile-container-link__bookmark ${active
                === 'bookmark' && ' profile-active'}`}
            >
              Bookmarks
            </button>
            <button
              type="submit"
              onClick={() => this.getResponse('drafts')}
              className={`profile-container-link__drafts ${active
                === 'drafts' && ' profile-active'}`}
            >
              Drafts
            </button>
          </div>
        </div>
        <div className="profile-container__response">
          Response from Bookmarks,
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
    return <div>{page}</div>;
  }
}

export default connect({ getProfileRequest })(ViewProfile);
