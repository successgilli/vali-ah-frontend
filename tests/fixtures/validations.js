export default (validator) => [{
  field: 'email',
  check: validator.isEmail,
  message: 'Enter a valid email'
}, {
  field: 'password',
  check: validator.isEmpty,
  validWhen: false,
  message: 'Password cannot be empty'
}, {
  field: 'password',
  check: validator.isLength,
  args: [{ min: 4 }],
  message: 'Check password length'
}];
