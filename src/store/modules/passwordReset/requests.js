import http from 'utils/http';

export default {
  resetPassword: async ({ email }) => http.post('/auth/reset_password', {
    email
  }),

  updatePassword: async ({ password, id, token }) => http.patch(`/auth/update_password/${id}/${token}`, {
    password
  })
};
