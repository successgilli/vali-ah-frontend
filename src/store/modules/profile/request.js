// third-party libraries
import http from 'utils/http';

const getProfileUrl = '/users/profile';
const updateProfileUrl = '/users/profile';

export default {
  viewProfile: async (id) => {
    const response = await http.get(`${getProfileUrl}/${id.id || id}`);

    return response;
  },
  updateProfile: async (data) => {
    const response = await http.patch(`${updateProfileUrl}/${data.id}`, data.formData);
    return response;
  },
};
