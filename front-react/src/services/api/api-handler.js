import { loggerService, tokenService } from '../index';
import axios from 'axios';

const getApiUriToCall = path => {
  console.log(process.env.NODE_ENV);
  if(process.env.NODE_ENV === 'production') return `${window.location.origin}/api/${path}`
  return `http://localhost:3001/api/${path}`;
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
