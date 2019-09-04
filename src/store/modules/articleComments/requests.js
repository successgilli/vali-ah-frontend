import http from 'utils/http';

const options = {
  headers: { 'Content-Type': 'application/json' }
};

export const getComments = async ({ articleId }) => {
  try {
    const { data } = await http.get(`/articles/${articleId}/comments`);
    return data;
  } catch (error) {
    throw error.message;
  }
};

export const createComment = async ({ content, articleId }) => {
  try {
    const data = JSON.stringify({ content });
    const response = await http.post(`/articles/${articleId}/comments`, data, options);
    return response.data;
  } catch (error) {
    throw error.message;
  }
};
