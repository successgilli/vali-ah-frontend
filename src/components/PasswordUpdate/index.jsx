// react libraries
import React from 'react';

// third-party libraries
import PropTypes from 'prop-types';

// components
import Form from 'components/Form';
import Message from 'components/Message';

// helper functions
import connect from 'utils/connect';
import { passwordUpdateRequest } from 'modules/passwordReset';
import validations from 'validations/passwordReset';

// styles
import './PasswordUpdate.scss';

const { updatePasswordValidation } = validations;

export class PasswordUpdateComponent extends React.Component {
  fields = [{
    label: '',
    placeHolder: 'password',
    type: 'password',
    name: 'password',
  }, {
    label: '',
    placeHolder: 'confirm password',
    type: 'password',
    name: 'confirmPassword',
  }];

  static propTypes = {
    passwordUpdateRequestDispatch: PropTypes.func.isRequired,
    resetPassword: PropTypes.oneOfType([PropTypes.object]),
    match: PropTypes.oneOfType([PropTypes.object]).isRequired,
    location: PropTypes.oneOfType([PropTypes.object]).isRequired
  }

  static defaultProps = {
    resetPassword: {},
  }

  handleSubmit = (formData) => {
    const { passwordUpdateRequestDispatch, location, match: { params } } = this.props;

    const token = new URLSearchParams(location.search).get('token');

    passwordUpdateRequestDispatch({ ...formData, ...params, token });
  };

  render() {
    const { resetPassword: { message, error, errors = [] } } = this.props;

    return (
      <>
        <Message
          heading={message}
          error={error}
          active={!!message}
          messages={Object.values(errors)}
        />

        <div className="password-reset">
          <span>Update password</span>
          <span>Enter your new password</span>

          <Form fields={this.fields} buttonText="Update" onSubmit={this.handleSubmit} validationRule={updatePasswordValidation} doneLoading={!!message} />
        </div>
      </>
    );
  }
}

export default connect({
  passwordUpdateRequestDispatch: passwordUpdateRequest
})(PasswordUpdateComponent);
