import axios from 'axios'
import { prop } from 'ramda'
import env from '../env/env'
import logger from './logger-service'

async function getAll(path) {
  try {
    const url = `${env('API_URL')}${path}`
    const response = await axios.get(url, { json: true })
    return prop('data', response)
  } catch (error) {
    logger.error(error.message)
  }
}

async function post(path, data) {
  try {
    const url = `${env('API_URL')}${path}`
    const response = await axios.post(url, { ...data, json: true })
    return prop('data', response)
  } catch (error) {
    logger.error(error.message)
  }
}

async function put(path, data) {
  try {
    const url = `${env('API_URL')}${path}`
    const response = await axios.patch(url, { ...data, json: true })
    return prop('data', response)
  } catch (error) {
    logger.error(error.message)
  }
}

async function deleteTask(path) {
  try {
    const url = `${env('API_URL')}${path}`
    const response = await axios.delete(url)
    return prop('data', response)
  } catch (error) {
    logger.error(error.message)
  }
}

export default {
  get: getAll,
  post,
  put,
  delete: deleteTask,
}
