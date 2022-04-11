import axios from 'axios';
import ApiConstants from '../api/constants';

const APIClient = axios.create({
  baseURL: ApiConstants.BASE_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});
APIClient.interceptors.request.use(
  (config) => {
    // const { token } = store.getState().loginData;
    const token = localStorage.getItem('eBook-token');
    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);
APIClient.interceptors.response.use(
  async (response) => {
    return response;
  },
  (error) => {
    const tokenMessage = 'FAILED_DECODE_TOKEN';
    if (
      error &&
      error.response &&
      error.response.data &&
      error.response.data.error &&
      error.response.data.errorType === tokenMessage
    ) {
      localStorage.clear();
      window.location.replace('/login');
    }
    return Promise.reject(error);
  }
);

export default APIClient;
