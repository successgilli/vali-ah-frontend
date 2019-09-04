// utils
import http from 'utils/http';

/* TODO(Miracle) Refactor this request to return
  correct response when real implementation is ready  */
export default {
  voteArticle: async ({ articleId, voteType }) => http.post(`/articles/${articleId}/vote`, {
    voteType
  })
};
