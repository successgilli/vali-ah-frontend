// react libraries
import React from 'react';

// third-party libraries
import PropTypes from 'prop-types';

// components
import Form from 'components/Form';
import Message from 'components/Message';

// helper functions
import connect from 'utils/connect';
import validations from 'validations/passwordReset';

// modules
import { passwordResetRequest } from 'modules/passwordReset';

// styles
import './PasswordReset.scss';

const { resetPasswordValidation } = validations;

export class PasswordResetComponent extends React.Component {
  fields = [{
    label: '',
    placeHolder: 'Email address',
    type: 'text',
    name: 'email',
  }];

  static propTypes = {
    passwordResetRequestDispatch: PropTypes.func.isRequired,
    resetPassword: PropTypes.shape({
      message: PropTypes.string,
      error: PropTypes.string,
      errors: PropTypes.object
    })
  }

  static defaultProps = {
    resetPassword: {},
  }


  handleSubmit = (formData) => {
    const { passwordResetRequestDispatch } = this.props;

    passwordResetRequestDispatch(formData);
  };

  render() {
    const { resetPassword: { message, error, errors = {} } } = this.props;
    return (
      <>
        <Message
          active={!!message}
          heading={message}
          error={error}
        />
        <div className="password-reset">
          <span>Reset password</span>
          <span>Enter your email address</span>
          <span>We will send you a password reset link</span>

          <Form fields={this.fields} buttonText="Reset" onSubmit={this.handleSubmit} validationRule={resetPasswordValidation} formErrors={errors} doneLoading={!!message} />
        </div>
      </>
    );
  }
}

export default connect({
  passwordResetRequestDispatch: passwordResetRequest
})(PasswordResetComponent);
