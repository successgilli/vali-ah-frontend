export default {
  resetPasswordValidation: (validator) => [{
    field: 'email',
    check: validator.isEmail,
    message: 'Enter a valid email'
  }],

  updatePasswordValidation: (validator) => [{
    check: validator.isEmpty,
    validWhen: false,
    message: 'Password cannot be empty'
  }, {
    field: 'password',
    check: validator.isLength,
    args: [{ min: 8, max: 15 }],
    message: 'Password should be between 8 and 15 characters'
  },
  {
    field: 'confirmPassword',
    check: (fields) => fields.password === fields.confirmPassword,
    custom: true,
    message: 'Password and confirm password should be equal'
  }]
};
