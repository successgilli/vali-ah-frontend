import http from 'utils/http';

export default {
  loginUser: async (data) => {
    try {
      const response = await http.post(`${process.env.API_ROUTE}/auth/signin`, data);
      return response;
    } catch (error) {
      return error.response;
    }
  }
};
