import ApiConstants from './constants';
import axios from 'axios';

export default async function api(path, method, params) {
  let options;
  let token = localStorage.getItem('kgen-token');
  options = {
    headers: {
      Accept: 'application/json',
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    method: method,
    url: ApiConstants.BASE_URL + path,
    ...(params && { data: params }),
  };

  return axios(options)
    .then((response) => {
      return Promise.resolve(response.data);
    })
    .catch((error) => {
      if (error?.response?.status === 401) {
        return localStorage.clear();
      }
      return Promise.reject(error?.response?.data);
    });
}
