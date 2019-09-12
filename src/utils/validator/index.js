import validator from 'validator';

export default class FormValidator {
  constructor(validationRules) {
    this.rules = validationRules;
  }

  static runValidator(validationData) {
    const {
      check, formData, custom, field, args = []
    } = validationData;

    return custom ? check(formData) : check(formData[field] || '', ...args);
  }

  validate(formData) {
    const errors = this.rules(validator).reduce((acc, rules) => {
      const {
        field, message, validWhen = true
      } = rules;

      const validity = FormValidator.runValidator({ ...rules, formData });

      if (validity !== validWhen && !validity) {
        acc[field] = [...(acc[field] || []), message];
      }

      return acc;
    }, {});

    return { isValid: !Object.keys(errors).length, ...errors };
  }
}
