// jwt third party library
import jwt from 'jsonwebtoken';

/**
 * An authenticated method to that returns a user id and if token is has expired
 */
const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  const decodedToken = jwt.decode(token, { complete: true });
  const dateNow = new Date();

  if (!decodedToken || decodedToken.payload.exp < dateNow.getTime() / 1000) {
    return { isExpired: true };
  }
  return { isExpired: false, id: decodedToken.payload.id };
};

export default isAuthenticated;
