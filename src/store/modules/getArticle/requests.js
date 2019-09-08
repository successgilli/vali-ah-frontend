import http from 'utils/http';

export default {
  getArticle: async (articleSlug) => {
    const response = await http.get(`/articles/${articleSlug}`);
    return response.data;
  }
};
