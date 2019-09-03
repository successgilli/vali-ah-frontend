/* eslint-disable no-unused-vars */
// react libraries
import React from 'react';

// third-party libraries
import PropTypes from 'prop-types';

// helper functions
import classNames from 'utils/classnames';
import Validator from 'utils/validator';

// styles
import './Form.scss';

export default class Form extends React.Component {
  static propTypes = {
    fields: PropTypes.arrayOf(PropTypes.object).isRequired,
    header: PropTypes.oneOfType([PropTypes.node, PropTypes.string]),
    rootClass: PropTypes.string,
    children: PropTypes.node,
    buttonText: PropTypes.string,
    onSubmit: PropTypes.func.isRequired,
    validationRule: PropTypes.func,
    formErrors: PropTypes.shape({}),
    doneLoading: PropTypes.bool
  }

  static defaultProps = {
    header: '',
    rootClass: '',
    children: '',
    buttonText: 'Submit',
    validationRule: null,
    formErrors: {},
    doneLoading: false
  }

  static getDerivedStateFromProps({ formErrors, doneLoading }) {
    return { customFormErrors: formErrors, ...(doneLoading && { isLoading: !doneLoading }) };
  }

  constructor(props) {
    super(props);
    const fields = this.getInitialFields();
    this.state = { fields, errors: {}, isLoading: false };
  }

  get fields() {
    const { fields: formFields } = this.props;
    const {
      errors, fields, customFormErrors, isSubmitted
    } = this.state;

    return formFields.map(({
      label, placeHolder, type, name, fieldClass
    }) => (
      <div key={name} className={`field ${fieldClass}`}>
        <label htmlFor={name}>
          {label}
          <input
            id={name}
            name={name}
            placeholder={placeHolder}
            type={type}
            value={fields[name]}
            onChange={this.handleChange}
          />
          <i className="form--error">{(fields[name].length || isSubmitted) && (errors[name] || customFormErrors[name])}</i>
        </label>
      </div>
    ));
  }

  onFormSubmit = () => {
    const { onSubmit, validationRule } = this.props;
    const { fields } = this.state;
    let errorFound = true;

    this.setState({ isSubmitted: true });
    if (validationRule && this.validateFields(fields)) {
      errorFound = false;
      this.setState({ errors: {} });
    }


    if (!validationRule || !errorFound) {
      this.setState({ isLoading: true });
      onSubmit(fields);
    }
  }

  getInitialFields() {
    const { fields: formFields } = this.props;
    return formFields.reduce((acc, { name }) => {
      acc[name] = '';

      return acc;
    }, {});
  }

  validateFields = (fields) => {
    const { validationRule } = this.props;

    if (!validationRule) return false;

    const validate = new Validator(validationRule);
    const { isValid, ...errors } = validate.validate(fields);

    this.setState({ errors });

    return isValid;
  }

  handleChange = (event) => {
    event.preventDefault();

    const { name, value } = event.target;
    const { fields } = this.state;
    const newFields = { ...fields, [name]: value };

    this.setState({ fields: newFields, isSubmitted: false });
    this.validateFields(newFields);
  }

  render() {
    const {
      header, rootClass, children, buttonText
    } = this.props;

    const { isLoading } = this.state;

    const classList = classNames('ui form', rootClass);
    const buttonClassList = classNames('ui', {
      active: isLoading
    }, 'loader');

    return (
      <>
        {header}
        <form className={classList}>
          <div className="ui form">
            {this.fields}
            <div role="presentation" className="ui button" disabled={isLoading} onKeyDown={this.onFormSubmit} onClick={this.onFormSubmit}>
              {buttonText}
              <div className={buttonClassList} />
            </div>
          </div>
          {children}
        </form>
      </>
    );
  }
}
