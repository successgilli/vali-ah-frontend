// react libraries
import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';

// helper functions
import connect from 'utils/connect';
import Validation from 'utils/validator';
import classNames from 'utils/classnames';

// modules
import { createUserRequest } from 'modules/signUp';

// components
import Input from 'components/Input';
import Button from 'components/Button';

import signup from 'validations/Signup';

// styles
import './Signup.scss';
/**
 * Signup component
 *
 */
class Signup extends Component {
  /**
    * @name Signup propTypes
    * @type {propTypes}
    *
    * @param {Object} props - React PropTypes
    *
    * @property {Function} signupUser - handles signup action by dispatching signup request action
    * @property {Object}  signupUser - object containing signup user details
    *
    */
  static propTypes = {
    createUserRequest: PropTypes.func.isRequired,
    signup: PropTypes.shape({
      success: PropTypes.string,
      error: PropTypes.string,
      isRequesting: PropTypes.bool
    }).isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      firstName: '',
      lastName: '',
      userName: '',
      email: '',
      password: '',
      confirmPassword: '',
      errors: {
        firstName: '',
        lastName: '',
        userName: '',
        email: '',
        password: '',
        confirmPassword: ''
      },
      showMessage: false,
    };
  }

  static getDerivedStateFromProps(newProps, prevState) {
    const { signup: { success, error } } = newProps;
    if (success || error) return { showMessage: true };

    return prevState;
  }

  /**
    * Handles input into the form by updating state with values
    * @method
    *
    * @param {Object} event - target object
    *
    * @return {void}
    */
  handleInput = (event) => {
    const { name, value } = event.target;
    const { errors, ...others } = this.state;
    const newFields = { ...others, [name]: value };

    const validatorErrors = new Validation(signup).validate(newFields);

    this.setState({ errors: { ...errors, [name]: validatorErrors[name] }, ...newFields });
  }

  formValid = (formErrors) => !Object.values(formErrors).filter((val) => !!val).length

  handleSubmit = (event) => {
    event.preventDefault();

    const { errors } = this.state;

    if (this.formValid(errors)) {
      const {
        firstName, lastName, userName, email, password
      } = this.state;
      const { createUserRequest: signupUser } = this.props;
      signupUser({
        firstName, lastName, userName, email, password
      });
    }
    return false;
  }

  render() {
    const {
      firstName, lastName, userName, email, password, confirmPassword, errors
    } = this.state;
    const { showMessage } = this.state;
    const { signup: { success, error, isRequesting } } = this.props;
    const classList = classNames({
      'success-msg': success,
      'error-msg': error
    });

    const userMessage = success ? 'check your email for the confirmation link!' : error;

    return ((
      <div>
        {success && <Redirect to="/feed" />}
        <form className="form-wrapper" onSubmit={this.handleSubmit}>

          { showMessage && <div className={classList}>{userMessage}</div>}
          <div className="input-fields-row">
            <label className="form__label" htmlFor="firstName">
              <Input
                name="firstName"
                value={firstName}
                className="label__input-element"
                placeholder="First Name"
                onChange={this.handleInput}
                required
              />
              {<span className="form__errors">{errors.firstName}</span>}
            </label>
            <label className="form__label" htmlFor="lastName">
              <Input
                name="lastName"
                value={lastName}
                className="label__input-element"
                placeholder="Last Name"
                onChange={this.handleInput}
                required
              />
              {<span className="form__errors">{errors.lastName}</span>}
            </label>
          </div>
          <div className="input-fields-row">
            <label className="form__label" htmlFor="userName">
              <Input
                type="text"
                name="userName"
                value={userName}
                className="label__input-element"
                placeholder="Username"
                onChange={this.handleInput}
                required
              />
              {<span className="form__errors">{errors.userName}</span>}
            </label>
            <label className="form__label" htmlFor="email">
              <Input
                name="email"
                value={email}
                className="label__input-element"
                placeholder="Email"
                onChange={this.handleInput}
                required
              />
              {<span className="form__errors">{errors.email}</span>}
            </label>
          </div>
          <div className="input-fields-row">
            <label className="form__label" htmlFor="password">
              <Input
                type="password"
                name="password"
                value={password}
                className="label__input-element"
                placeholder="Password"
                onChange={this.handleInput}
                required
              />
              {<span className="form__errors">{errors.password}</span>}
            </label>
            <label className="form__label" htmlFor="password">
              <Input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                className="label__input-element"
                placeholder="Confirm Password"
                onChange={this.handleInput}
                required
              />
              {<span className="form__errors" id="shwMessage">{errors.confirmPassword}</span>}
            </label>
          </div>
          <div className="btn-section">
            { (isRequesting) && <div className="loader-wrapper"><div className="loader" /></div> }
            { (!isRequesting) && <Button type="submit" text="Signup" className="form__submit-btn">Signup</Button> }
          </div>
        </form>
      </div>
    ));
  }
}

export default connect({ createUserRequest })(Signup);
export { Signup as SignupComponent };
