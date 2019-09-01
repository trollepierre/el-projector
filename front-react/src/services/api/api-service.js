import axios from 'axios'
import { prop } from 'ramda'
import env from '../../env/env'
import logger from '../logger-service'
import authenticationService from '../auth/auth-service';

function generateOptionsWithAccessToken() {
  const accessToken = authenticationService.getAccessToken();
  return { headers: { Authorization: `Bearer ${accessToken}`, json: true } };
}

async function getAll(path, setIsAuthenticated) {
  try {
    console.log('insde get all');

    const url = `http://localhost:3001/${path}`
    const options = generateOptionsWithAccessToken()
    const response = await axios.get(url, options)
    console.log('response -- api');
    console.log(prop('data', response)) ;


    return prop('data', response)
  } catch (error) {
    console.log('error -- api');

    console.log({ error });
    await setIsAuthenticated(false)
    await authenticationService.disconnect()

    if(error.status === 401) {
      console.log('error');
      await authenticationService.disconnect()
      setIsAuthenticated(false)
    }
    logger.error(error)
    alert(error.message)
  }
}

async function post(path, data, isUnauthenticated = false) {
  try {
    console.log('inside post');

    // const url = `${env('API_URL')}${path}`
    const url = `http://localhost:3001/${path}`
    console.log({url});

    const options = (isUnauthenticated) ? { json: true } : generateOptionsWithAccessToken()
    const response = await axios.post(url, data, options)
    return prop('data', response)
  } catch (error) {
    logger.error(error)
  }
}

async function put(path, data) {
  try {
    const url = `${env('API_URL')}${path}`
    const options = generateOptionsWithAccessToken()
    const response = await axios.patch(url, data, options)
    return prop('data', response)
  } catch (error) {
    logger.error(error)
  }
}

async function deleteTask(path) {
  try {
    const url = `${env('API_URL')}${path}`
    const options = generateOptionsWithAccessToken()
    const response = await axios.delete(url, options)
    return prop('data', response)
  } catch (error) {
    logger.error(error)
  }
}

export default {
  get: getAll,
  post,
  put,
  delete: deleteTask,
}
