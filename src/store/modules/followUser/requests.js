// utils
import http from 'utils/http';

export default {
  followUser: async (userId) => {
    try {
      const response = await http.patch(`/users/profile/${userId}/following`);
      return response.data;
    } catch (error) {
      throw error.response.error.data;
    }
  }
};
