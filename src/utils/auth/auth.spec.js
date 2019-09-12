import axios from 'axios';
import isAuthenticated from './index';

describe('auth', () => {
  it('should check if token is valid', async () => {
    const { data } = await axios.post(
      'https://vali-1kbideas-staging.herokuapp.com/api/v1/auth/signin',
      {
        password: 'lovem!588',
        email: 'myjoy@gmail.com',
      },
    );
    const { token } = data.data;
    localStorage.setItem('token', token);
    const { id, isExpired } = isAuthenticated();

    expect(id).toBeDefined();
    expect(isExpired).toBe(false);
  });
  it('should check if token is not valid', () => {
    const token = 'fiohjhuihi38uhgrjhuih4nhjh';
    localStorage.setItem('token', token);
    const { id, isExpired } = isAuthenticated();

    expect(id).toBeUndefined();
    expect(isExpired).toBe(true);
  });
});
