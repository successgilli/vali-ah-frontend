import http from 'utils/http';

export default {
  voteArticle: async ({ articleId, voteType }) => {
    const response = await http.post(`/articles/${articleId}/vote`, {
      voteType
    });

    return response.responseBody;
  }
};
