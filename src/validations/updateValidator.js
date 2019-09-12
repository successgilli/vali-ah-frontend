export default {
  updateProfileValidation: (validator) => [
    {
      check: validator.isEmpty,
      validWhen: false,
      message: ' Field cannot be empty',
    },
    {
      field: 'firstName',
      check: validator.isLength,
      args: [{ min: 3, max: 15 }],
      message: 'First name should be between 8 and 15 characters',
    },
    {
      field: 'lastName',
      check: validator.isLength,
      args: [{ min: 3, max: 15 }],
      message: 'Last name should be between 8 and 15 characters',
    },
    {
      field: 'userName',
      check: validator.isLength,
      args: [{ min: 3, max: 15 }],
      message: 'Username name should be between 8 and 15 characters',
    },
    {
      field: 'bio',
      check: validator.isLength,
      args: [{ min: 3, max: 80 }],
      message: 'Bio should be between 8 and 80 characters',
    },
  ],
};
