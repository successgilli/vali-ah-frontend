import http from 'utils/http';

export default {
  getBookmarkedArticles: async () => {
    try {
      const response = await http.get('articles/bookmarks');
      return response.data;
    } catch (error) {
      throw error.message;
    }
  }
};
