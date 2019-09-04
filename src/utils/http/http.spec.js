import http from './index';

describe('HTTP client', () => {
  it('should have a base url attached', () => {
    expect(http.defaults.baseURL).toBeDefined();
  });

  it('should attach the authentication token', () => {
    localStorage.setItem('token', 'token');
    http.interceptors.request.handlers[0].fulfilled(http.defaults);

    expect(http.defaults.headers.Authorization).toBe('Bearer token');
  });

  it('should return the axios response data', () => {
    const response = http.interceptors.response.handlers[0].fulfilled({ data: { data: [] } });

    expect(response).toEqual({ data: [] });
  });
});
