import http from 'utils/http';

const options = {
  headers: { 'Content-Type': 'application/json' }
};

export default {
  socialLoginUser: async ({ accessToken, provider }) => {
    try {
      const data = JSON.stringify({ accessToken });
      const response = await http.post(`/auth/${provider}`,
        data,
        options);
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
};
