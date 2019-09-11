// utils
import http from 'utils/http';

/* TODO(Miracle) Refactor this request to return
  correct response when real implementation is ready  */
export default {
  createComment: async ({
    articleId, content, startIndex, endIndex
  }) => http.post(`/articles/${articleId}/inline_comments`, {
    content, startIndex, endIndex
  }),

  getComments: async (articleId) => http.get(`/articles/${articleId}/inline_comments`)
};
