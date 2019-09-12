import http from 'utils/http';

export default {
  signupUser: async (data) => {
    const response = await http.post('/auth/signup', data);
    return response;
  }
};
