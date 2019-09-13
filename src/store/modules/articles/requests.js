import http from 'utils/http';

const options = {
  headers: { 'Content-Type': 'application/json' }
};

export const createArticle = async ({ content }) => {
  try {
    const data = JSON.stringify(content);
    const response = await http.post('/articles', data, options);
    return response.data;
  } catch (error) {
    throw error.message;
  }
};

export const getArticle = async () => { };
