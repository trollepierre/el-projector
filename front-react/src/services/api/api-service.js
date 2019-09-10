import { prop } from 'ramda';
import { axiosHandler } from './api-handler'

export default {
  get: axiosHandler('get', prop('data')),
  post: axiosHandler('post', prop('data')),
  put: axiosHandler('put', prop('status')),
  delete: axiosHandler('delete', prop('status')),
};
