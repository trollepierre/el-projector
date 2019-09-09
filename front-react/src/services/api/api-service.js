import axios from 'axios'
import { prop } from 'ramda'
import env from '../../env/env'
import logger from '../logger-service'
import authenticationService from '../auth/auth-service';
import { api, auth } from '../index';

function generateOptionsWithAccessToken() {
  const accessToken = authenticationService.getAccessToken();
  return { headers: { Authorization: `Bearer ${accessToken}`, json: true } };
}

async function getAll(path) {
    console.log('inside get all');
    const url = `http://localhost:3001/${path}`
    const options = generateOptionsWithAccessToken()
  try {

    const response = await axios.get(url, options)
    console.log('response -- api');
    console.log(prop('data', response)) ;


    return prop('data', response)
  } catch (error) {
    console.log('error -- api');

    console.log({ error });
    // await setIsAuthenticated(false)
    // await authenticationService.disconnect()
    //
    console.log(error.message);


    if(error.message === 'Request failed with status code 401') {
      console.log('error catché youpi');
      // await authenticationService.disconnect()

      const refreshToken = await authenticationService.getRefreshToken()

      return api.post('login/token', {refreshToken})
        .then(async tokens => {
          await auth.reauthenticate(tokens)
          const response = await axios.get(url, generateOptionsWithAccessToken())
            .catch(err => {
              alert('the get after reauthenticated fails')
              console.log(err);
              throw err
            })
          console.log('response -- api');
          console.log(prop('data', response)) ;
          return prop('data', response)
        })
        .catch(err => {
          alert('an error with refresh token happe')
          console.log(err.message);
          throw err
        })

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
