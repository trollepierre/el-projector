import { logger, token } from '../index';
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
    ...({ ...token.getAccessToken() ? { Authorization: `Bearer ${(token.getAccessToken())}` } : {} }),
  },
});

const handleErrors = error => {
  logger.error(error);
  throw error;
};

const axiosHandler = (method, update) => (apiPath, data) =>
  Promise
    .resolve(getAxiosConfiguration({ method, apiPath, data }))
    .then(axios)
    .then(update)
    .catch(handleErrors);

export {
  axiosHandler
};
