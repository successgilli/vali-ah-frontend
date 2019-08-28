const getObjectClass = (objectClass) => Object.entries(objectClass)
  .reduce((acc, [singleClass, boolCheck]) => {
    if (boolCheck) acc.push(singleClass);

    return acc;
  }, []).join(' ');

export default (...classnames) => classnames.map((singleClass) => {
  if (typeof singleClass === 'string') return singleClass;
  if ({}.constructor === singleClass.constructor) return getObjectClass(singleClass);
  if (Array.isArray(singleClass)) return singleClass.join(' ');

  return singleClass;
}).join(' ');
