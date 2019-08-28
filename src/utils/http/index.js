/* eslint-disable no-param-reassign */
/**
 * An axios proxy to attach the base url and authentication token
 */
import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: process.env.API_ROUTE
});

axiosInstance.interceptors.request.use((config) => {
  config.headers.Authorization = `BEARER ${localStorage.getItem('token')}`;

  return config;
});

axiosInstance.interceptors.response.use((config) => {
  config.responseBody = config?.data?.data;

  return config;
});

export default axiosInstance;
