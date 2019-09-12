export default (validator) => [
  {
    field: 'firstName',
    args: [{ min: 2, max: 15 }],
    check: validator.isLength,
    message: '2 to 15 characters required'
  },
  {
    field: 'firstName',
    check: validator.isAlpha,
    message: 'alphabetic characters only'
  },
  {
    field: 'lastName',
    args: [{ min: 2, max: 15 }],
    check: validator.isLength,
    message: '2 to 15 characters required'
  },
  {
    field: 'lastName',
    check: validator.isAlpha,
    message: 'alphabetic characters only'
  },
  {
    field: 'email',
    check: validator.isEmail,
    message: 'invalid email address'
  },
  {
    field: 'userName',
    args: [{ min: 2, max: 20 }],
    check: validator.isLength,
    message: '2 to 20 characters required'
  },
  {
    field: 'password',
    check: validator.isLength,
    args: [{ min: 8, max: 15 }],
    message: '8 to 15 characters required'
  },
  {
    field: 'confirmPassword',
    check: (fields) => fields.password === fields.confirmPassword,
    custom: true,
    message: 'Password and confirm password should be equal'
  }
];
