import axios from 'axios'

function request(method, options) {
  const {
    url
  } = options;
  const baseURL = 'http://localhost:8000';
  return axios({
    baseURL,
    method,
    url,
  })
}

export default { get: params => request('get', params) };