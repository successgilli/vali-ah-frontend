// react libraries
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';

// request
import ProfileHelper from 'modules/profile/request';

// actions
import { getProfileRequestUpdateSuccess } from 'modules/profile';
import connect from 'utils/connect';

// utils
import Validator from 'utils/validator';
import isAuthenticated from 'utils/auth';

// assets
import imageplaceholder from 'assets/images/image-placeholder.svg';
import imagecamera from 'assets/images/camera.svg';

// validation rules
import profileValidation from 'validations/updateValidator';
import './ProfileUpdate.scss';

const { updateProfileValidation } = profileValidation;

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
    getProfileRequestUpdateSuccess: PropTypes.func.isRequired,
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
      errors: '',
    };
  }

  componentDidMount() {
    const { id } = isAuthenticated();

    this.loadProfile(id);
  }

  /**
   * Loads the profile when component mount
   * @method
   *
   * @return {void}
   */
  loadProfile = async (id) => {
    const user = await ProfileHelper.viewProfile(id);

    this.setState(() => ({
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
      data: {
        ...prevState.data,
        [name]: value,
      },
    }));
  };

  /**
   * Handles input onFocus
   * @method
   *
   * @return {void}
   */
  onFocus = () => {
    this.setState((prevState) => ({
      ...prevState,
      errors: '',
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

    const profileValidator = new Validator(updateProfileValidation);

    const { data, id } = this.state;

    const { isValid, ...errors } = profileValidator.validate(data);

    this.setState({ errors });

    if (!isValid) return null;

    const {
      getProfileRequestUpdateSuccess: requestUpdate,
      history,
      profile,
    } = this.props;
    const formData = new FormData();

    Object.keys(data).forEach((field) => {
      if (field !== 'id') {
        formData.append(field, data[field]);
      }
    });

    await requestUpdate({ formData, id });
    if (profile.errors === null) {
      return history.push('/profile/view');
    }
    return null;
  };

  render() {
    const { data, displayImg, errors } = this.state;
    const {
      profile: { loading },
    } = this.props;
    const { isExpired } = isAuthenticated();
    const page = !isExpired ? (
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
                  src={imagecamera}
                  alt=""
                />
              </label>
            </div>
            <div className="profile-container__image-placeholder-update">
              <img
                id="profile-img"
                className="profile-container__image-preview"
                src={displayImg || imageplaceholder}
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
            <p className="username">{`${data.firstName}  ${data.lastName}`}</p>
          </div>
          <div className="profile-container__bio-update">
            <p id="bio">{data.bio}</p>
          </div>
        </div>
        <div className="profile-container__details">
          <form
            id="updateform"
            className="ui form"
            onSubmit={this.handleUserUpdate}
          >
            <div className="field">
              <label htmlFor="firstname">
                First Name
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name"
                  id="firstname"
                  className="firstName"
                  value={data.firstName}
                  onChange={this.onChangeHandler}
                  onFocus={this.onFocus}
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
                  onFocus={this.onFocus}
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
                  onFocus={this.onFocus}
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
                  className="update-bio"
                  value={data.bio ? data.bio : ''}
                  onChange={this.onChangeHandler}
                  onFocus={this.onFocus}
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
              {loading && <span className="ui small text loader" />}
              {!loading ? 'Update' : ''}
            </button>
          </form>
        </div>
      </div>
    ) : (
      <Redirect to="/" />
    );
    return <div>{page}</div>;
  }
}
export default connect({ getProfileRequestUpdateSuccess })(ProfileUpdate);
