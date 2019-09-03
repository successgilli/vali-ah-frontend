import React from 'react';

import { fields } from 'fixtures/form';

import validationRules from 'fixtures/validations';
import Form from './index';


describe('Form component', () => {
  it('should renders properly', () => {
    const form = mount(<Form fields={fields} onSubmit={jest.fn()} />);

    expect(form.find('.ui .form')).toHaveLength(1);
    expect(form.find('.field')).toHaveLength(2);
    expect(form.find('.button')).toHaveLength(1);
  });

  it('should handle field onchange', () => {
    const form = shallow(<Form fields={fields} onSubmit={jest.fn()} />);
    const preventDefault = jest.fn();
    const event = { target: { name: fields[0].name, value: 'text' }, preventDefault };

    form.find('input[name="email"]').simulate('change', event);

    const newState = form.state();

    expect(newState.fields).toMatchObject({ email: 'text' });
  });

  it('should handle form submission without validation rule', () => {
    const preventDefault = sinon.spy();
    const onSubmit = sinon.spy();
    const form = shallow(<Form fields={fields} onSubmit={onSubmit} />);

    const event = { target: { name: fields[0].name, value: 'text' }, preventDefault };

    form.find('input[name="email"]').simulate('change', event);
    form.find('.button').simulate('click');

    const newState = form.state();

    expect(newState.fields).toMatchObject({ email: 'text' });
    expect(onSubmit.calledOnce).toEqual(true);
  });

  it('should handle form submission with validation rule', () => {
    const preventDefault = sinon.spy();
    const onSubmit = sinon.spy();
    const form = shallow(
      <Form
        fields={fields}
        onSubmit={onSubmit}
        validationRule={validationRules}
      />
    );

    const event = { target: { name: 'email', value: 'email@example.com' }, preventDefault };
    const passwordEvent = { target: { name: 'password', value: 'password' }, preventDefault };


    form.find('input[name="email"]').simulate('change', event);
    form.find('input[name="password"]').simulate('change', passwordEvent);
    form.find('.button').simulate('click');

    const newState = form.state();

    expect(newState.fields).toMatchObject({ password: 'password', email: 'email@example.com' });
    expect(newState.isLoading).toBe(true);
    expect(onSubmit.calledOnce).toEqual(true);
  });

  it('should set isLoading state to false when loading finishes', () => {
    const preventDefault = sinon.spy();
    const onSubmit = sinon.spy();
    const form = mount(
      <Form
        fields={fields}
        onSubmit={onSubmit}
        validationRule={validationRules}
      />
    );

    const event = { target: { name: 'email', value: 'email@example.com' }, preventDefault };
    const passwordEvent = { target: { name: 'password', value: 'password' }, preventDefault };


    form.find('input[name="email"]').simulate('change', event);
    form.find('input[name="password"]').simulate('change', passwordEvent);
    form.find('.button').simulate('click');

    form.setProps({ doneLoading: true });
    form.update();

    const newState = form.state();

    expect(newState.isLoading).toBe(false);
  });

  it('should not submit form submission failing validation rule', () => {
    const preventDefault = sinon.spy();
    const onSubmit = sinon.spy();
    const form = shallow(
      <Form
        fields={fields}
        onSubmit={onSubmit}
        validationRule={validationRules}
      />
    );

    const event = { target: { name: 'email', value: 'text' }, preventDefault };

    form.find('input[name="email"]').simulate('change', event);
    form.find('.button').simulate('click');

    expect(onSubmit.calledOnce).toEqual(false);
  });
});
