import { loggerService, tokenService } from '../index';
import axios from 'axios';

const getApiUriToCall = path => {
  return `http://localhost:3001/${path}`;
  // return `${env('API_URL')}${path}`
};

const getAxiosConfiguration = ({ method, apiPath, data }) => ({
  url: getApiUriToCall(apiPath),
  method,
  data,
  headers: {
    ...({ ...tokenService.getAccessToken() ? { Authorization: `Bearer ${(tokenService.getAccessToken())}` } : {} }),
  },
});

const handleErrors = error => {
  loggerService.error(error);
  throw error;
};

const axiosHandler = (method, update) => (apiPath, data = undefined) =>
  Promise
    .resolve(getAxiosConfiguration({ method, apiPath, data }))
    .then(axios)
    .then(update)
    .catch(handleErrors);

export {
  axiosHandler
};
