// third-party libraries
import http from 'utils/http';

const articleUrl = '/articles';

export default {
  fetchArticle: async ({ articleSlug }) => {
    const response = await http.get(`${articleUrl}/${articleSlug}`);

    return response;
  }
};
