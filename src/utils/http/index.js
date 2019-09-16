/* eslint-disable no-param-reassign */
/**
 * An axios proxy to attach the base url and authentication token
 */
import axios from 'axios';

class ResponseError extends Error {
  constructor({ status, message, errors = [] }) {
    super();
    this.message = message;
    this.status = status;
    this.errors = errors;
  }
}

const http = axios.create({
  baseURL: process.env.API_ROUTE
});

http.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;

  return config;
});

http.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    const { response } = error;
    const { error: err } = response?.data;
    return Promise.reject(
      new ResponseError({ ...err, status: response?.status })
    );
  }
);

export default http;
