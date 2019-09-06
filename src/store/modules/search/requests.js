// third-party libraries
import http from 'utils/http';

const articleUrl = '/articles';

export default {
  searchArticles: async ({ term, query }) => {
    const response = await http.get(`${articleUrl}?${term}=${query}`);

    return response;
  },
};
