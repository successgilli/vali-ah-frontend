// react libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';

// jwt third party library
import jwt from 'jsonwebtoken';

// request
import ProfileHelper from 'modules/profile/request';

// actions
import { requestProfileUpdateSuccess } from 'modules/profile';
import connect from 'utils/connect';

// assets
import imagePlaceholder from '../../assets/images/imagePlaceholder.svg';
import imageCamera from '../../assets/images/camera.svg';
import './ProfileUpdate.scss';

/**
 * update profile page for individual Icon
 *
 */
export class ProfileUpdate extends Component {
  /**
   * @name ProfileUpdate propTypes
   * @type {propTypes}
   *
   * @param {Object} props - React PropTypes
   *
   * @property {Function} onSubmit - handles form submit
   * @property {Function} onchange - handles input changes
   *
   */
  static propTypes = {
    requestProfileUpdateSuccess: PropTypes.func.isRequired,
    profile: PropTypes.instanceOf(Object).isRequired,
    history: PropTypes.shape({
      push: PropTypes.func.isRequired,
    }).isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      id: '',
      displayImg: '',
      data: {
        image: '',
        firstName: '',
        lastName: '',
        userName: '',
        bio: '',
      },
    };
  }

  componentDidMount() {
    const data = jwt.decode(localStorage.getItem('token'));
    this.loadProfile(data.id);
  }

  /**
   * Loads the profile when component mount
   * @method
   *
   * @return {void}
   */
  loadProfile = async (id) => {
    const user = await ProfileHelper.viewProfile(id);

    this.setState((prevState) => ({
      ...prevState,
      id,
      data: {
        firstName: user.data.firstName,
        lastName: user.data.lastName,
        userName: user.data.userName,
        bio: user.data.bio,
      },
    }));
  };

  /**
   * Handles image selection
   * @method
   *
   * @return {void}
   */
  fileSelectorHandler = ({ target: { files } }) => {
    this.setState((prevState) => ({
      // ...prevState,
      displayImg: URL.createObjectURL(files[0]),
      data: {
        ...prevState.data,
        image: files[0],
      },
    }));
  };

  /**
   * Handles input change
   * @method
   *
   * @return {void}
   */
  onChangeHandler = ({ target }) => {
    const { name, value } = target;
    this.setState((prevState) => ({
      ...prevState,
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  };

  /**
   * Handles form submit
   * @method
   *
   * @return {void}
   */
  handleUserUpdate = async (event) => {
    event.preventDefault();

    const { data, id } = this.state;
    const {
      requestProfileUpdateSuccess: requestUpdate,
      history,
      profile,
    } = this.props;
    const formData = new FormData();
    Object.keys(data).forEach((value) => {
      if (value !== 'id') {
        formData.append([value], data[value]);
      }
    });
    await requestUpdate({ formData, id });
    if (profile.errors === null) {
      return history.push('/profile/view');
    }
    return false;
  };

  render() {
    const { data, displayImg } = this.state;
    const {
      profile: { loading, errors },
    } = this.props;

    return (
      <div className="profile-container">
        <div className="profile-container__header">
          <div className="profile-container__mini-header" />
          <div className="profile-container__image profile-container__image-update">
            <div className="profile-container__image-cover">
              <input
                type="file"
                id="image-upload"
                onChange={this.fileSelectorHandler}
                accept=".png, .jpg, .jpeg"
              />
              <label htmlFor="image-upload">
                {' '}
                <img
                  className="profile-container__image-camera"
                  src={imageCamera}
                  alt=""
                />
              </label>
            </div>
            <div className="profile-container__image-placeholder-update">
              <img
                id="profileImg"
                className="profile-container__image-preview"
                src={displayImg || imagePlaceholder}
                alt={`Profile avatar of ${data.firstName}`}
              />
            </div>
            {errors && errors.avatarUrl && (
              <span className="profile-container__bad-request">
                {errors.avatarUrl}
              </span>
            )}
          </div>
          <div className="profile-container__name">
            <p className="userName">{`${data.firstName}  ${data.lastName}`}</p>
          </div>
          <div className="profile-container__bio-update">
            <p id="bio">{data.bio}</p>
          </div>
        </div>
        <div className="profile-container__details">
          <form
            id="updateForm"
            className="ui form"
            onSubmit={this.handleUserUpdate}
          >
            <div className="field">
              <label htmlFor="firstName">
                First Name
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  id="firstName"
                  className="firstName"
                  value={data.firstName}
                  onChange={this.onChangeHandler}
                />
              </label>
              {errors && errors.firstName && (
                <span className="profile-container__bad-request">
                  {errors.firstName}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="lastName">
                Last Name
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name"
                  id="lastname"
                  className="lastname"
                  value={data.lastName}
                  onChange={this.onChangeHandler}
                />
              </label>
              {errors && errors.lastName && (
                <span className="profile-container__bad-request">
                  {errors.lastName}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="username">
                Username
                <input
                  type="text"
                  name="userName"
                  placeholder="Username"
                  id="username"
                  className="username"
                  value={data.userName}
                  onChange={this.onChangeHandler}
                />
              </label>
              {errors && errors.userName && (
                <span className="profile-container__bad-request">
                  {errors.userName}
                </span>
              )}
            </div>
            <div className="field">
              <label htmlFor="bio">
                Short Bio
                <textarea
                  rows="2"
                  name="bio"
                  id="bio"
                  className="updateBio"
                  value={data.bio ? data.bio : ''}
                  onChange={this.onChangeHandler}
                />
              </label>
              {errors && errors.bio && (
                <span className="profile-container__bad-request">
                  {errors.bio}
                </span>
              )}
            </div>
            <button
              className="ui right floated button orange button"
              type="submit"
              disabled={loading}
            >
              {loading && <span className="ui active centered inline loader" />}
              {!loading ? 'Update' : ''}
            </button>
          </form>
        </div>
      </div>
    );
  }
}
export default connect({ requestProfileUpdateSuccess })(ProfileUpdate);
