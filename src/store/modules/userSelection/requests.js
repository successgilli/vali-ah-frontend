// third-party libraries
import http from 'utils/http';

const articleUrl = '/articles';

export default {
  fetchSelection: async ({ query }) => {
    const response = await http.get(`${articleUrl}?page=1&&tag=${query}`);
    return response.data;
  }
};
