import axios from 'axios';
import { prop } from 'ramda';
import env from '../../env/env';
import { token, logger } from '../index';

function generateOptionsWithAccessToken() {
  const accessToken = token.getAccessToken();
  return { headers: { Authorization: `Bearer ${accessToken}`, json: true } };
}

async function getAll(path) {
  const url = `http://localhost:3001/${path}`;
  try {
    const options = generateOptionsWithAccessToken();
    const response = await axios.get(url, options);
    return prop('data', response);
  } catch (error) {
    logger.error(path, error);
    alert(error.message);
    throw error
  }
}

async function post(path, data, isUnauthenticated = false) {
  try {
    const url = `http://localhost:3001/${path}`;
    const options = isUnauthenticated ? { json: true } : generateOptionsWithAccessToken();
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
