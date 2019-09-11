// react libraries
import React from 'react';
import PropTypes from 'prop-types';

// utils
import connect from 'utils/connect';

// action
import { requestLogin } from 'modules/login';

// components
import Input from 'components/Input';
import Button from 'components/Button';

// styles
import './Signins.scss';

/**
 * Signin component
 *
 */
export class SigninComponent extends React.Component {
  /**
    * @name Signin propTypes
    * @type {propTypes}
    *
    * @param {Object} props - React PropTypes
    *
    * @property {Function} requestLogin - handles login action by dispatching login request action
    * @property {Object}  login - object containing user details and login state
    *
    */
  static propTypes = {
    requestLogin: PropTypes.func.isRequired,
    login: PropTypes.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: ''
    };
  }

  /**
    * Handles input into the form by updating state with values
    * @method
    *
    * @param {Object} e - target object
    *
    * @return {void}
    */
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  }

  /**
    * Handles vsubmit action
    * @method
    *
    * @param {Object} e - target object
    *
    * @return {void}
    */
  handleSubmit = (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    const { requestLogin: loginUser } = this.props;
    loginUser({ email, password });
  }

  render() {
    const { login } = this.props;
    const errors = Object.keys(login.loginError).map((eachError) => (
      <div key={eachError} className="error">{login.loginError[eachError]}</div>
    ));

    return ((
      <form className="login-form" onSubmit={this.handleSubmit}>
        <div className={(login.isLoggedIn === 'true') ? 'login-form__success login-form__success--show' : 'login-form__success login-form__success--hide'}>SIGNIN SUCCESSFUL !</div>
        <Input name="email" placeholder="Email Address" onChange={this.handleInput} />
        <Input name="password" type="password" placeholder="Password" onChange={this.handleInput} />
        <section className="login-form__errors">
          {errors}
        </section>
        <section className="login-form__submit-btn">
          {
            (login.isLoggedIn === 'loading') && <div className="login-form__loader-div"><div className="login-form__loader" /></div>
          }
          {
            (login.isLoggedIn !== 'loading') && <Button type="submit">Sign In</Button>
          }
        </section>
      </form>
    ));
  }
}

export default connect({ requestLogin })(SigninComponent);
