import validationRules from 'fixtures/validations';

import Validator from './index';

describe('validator module', () => {
  it('should intialiase the validation rules', () => {
    const validation = new Validator(validationRules);

    expect(validation.rules).toEqual(validationRules);
  });

  it('should validate field base on rules', () => {
    const validation = new Validator(validationRules);

    const { isValid, email } = validation.validate({ email: 'email' });

    expect(isValid).toBe(false);
    expect(email).toEqual(['Enter a valid email']);
  });

  it('should validate based on validWhen rule', () => {
    const validation = new Validator(validationRules);

    const { isValid, email } = validation.validate({ password: '' });

    expect(isValid).toBe(false);
    expect(email).toEqual(['Enter a valid email']);
  });

  it('should validate based on validWhen rule', () => {
    const validation = new Validator(validationRules);

    const { isValid } = validation.validate({ password: 'password', email: 'email@example.com' });

    expect(isValid).toBe(true);
  });
});
