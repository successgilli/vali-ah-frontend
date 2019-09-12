// third-party libraries
import http from 'utils/http';

const articleUrl = '/articles';

export default {
  fetchSelection: async ({ query }) => {
    const response = await http.get(`${articleUrl}?tag=${query}`);
    return response.data;
  }
};
