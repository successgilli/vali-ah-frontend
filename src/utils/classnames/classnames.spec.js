import classNames from './index';

describe('classnames util', () => {
  it('should return empty string if no class is passed in', () => {
    const classname = classNames();

    expect(classname).toEqual('');
  });

  it('should return class name if class string is supplied', () => {
    const classname = classNames('class');

    expect(classname).toEqual('class');
  });

  it('should return class name if object is supplied with validity boolean', () => {
    const classname = classNames({ valid: true });

    expect(classname).toEqual('valid');
  });

  it('should return class names if multiple object is supplied with validity boolean', () => {
    const classname = classNames({ valid: true, valid2: true });

    expect(classname).toEqual('valid valid2');
  });

  it('should return only valid class names after validity boolean', () => {
    const classname = classNames({ valid: true, invalid: false });

    expect(classname).toEqual('valid');
  });

  it('should return class names if array of classses is supplied', () => {
    const classname = classNames(['class1', 'class2']);

    expect(classname).toEqual('class1 class2');
  });

  it('should return any other datatype as string', () => {
    const classname = classNames(true);

    expect(classname).toEqual('true');
  });
});
