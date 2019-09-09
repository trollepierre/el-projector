import axios from 'axios';
import { prop } from 'ramda';
import env from '../../env/env';
import logger from '../logger/logger-service';
import authenticationService from '../auth/auth-service';
import { api, auth } from '../index';

function generateOptionsWithAccessToken() {
  const accessToken = authenticationService.getAccessToken();
  return { headers: { Authorization: `Bearer ${accessToken}`, json: true } };
}

async function getAll(path) {
  const url = `http://localhost:3001/${path}`;
  try {
    const options = generateOptionsWithAccessToken();
    const response = await axios.get(url, options);
    return prop('data', response);
  } catch (error) {
    if (error.message === 'Request failed with status code 401') {
      const refreshToken = await authenticationService.getRefreshToken();
      return api.post('login/token', { refreshToken })
        .then(async tokens => {
          await auth.reauthenticate(tokens);
          const response = await axios.get(url, generateOptionsWithAccessToken())
            .catch(err => {
              alert('the get after reauthenticated fails');
              console.log(err.message);
              throw err;
            });
          return prop('data', response);
        })
        .catch(err => {
          alert('an error with refresh token happe');
          console.log(err.message);
          throw err;
        });

    }
    logger.error(error);
    alert(error.message);
  }
}

async function post(path, data, isUnauthenticated = false) {
  try {
    const url = `http://localhost:3001/${path}`;
    const options = (isUnauthenticated) ? { json: true } : generateOptionsWithAccessToken();
    const response = await axios.post(url, data, options);
    return prop('data', response);
  } catch (error) {
    logger.error(error);
  }
}

async function put(path, data) {
  try {
    const url = `${env('API_URL')}${path}`;
    const options = generateOptionsWithAccessToken();
    const response = await axios.patch(url, data, options);
    return prop('data', response);
  } catch (error) {
    logger.error(error);
  }
}

async function deleteTask(path) {
  try {
    const url = `${env('API_URL')}${path}`;
    const options = generateOptionsWithAccessToken();
    const response = await axios.delete(url, options);
    return prop('data', response);
  } catch (error) {
    logger.error(error);
  }
}

export default {
  get: getAll,
  post,
  put,
  delete: deleteTask,
};
