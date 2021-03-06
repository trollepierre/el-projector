import axios from 'axios'
import { loggerService, tokenService } from '../index'

const getApiUriToCall = (path) => {
  if (process.env.NODE_ENV === 'production') return `${window.location.origin}/api/${path}`
  return `http://localhost:3001/api/${path}`
}

const getAxiosConfiguration = ({ method, apiPath, data }) => ({
  url: getApiUriToCall(apiPath),
  method,
  data,
  headers: {
    ...{ ...tokenService.getAccessToken() ? { Authorization: `Bearer ${tokenService.getAccessToken()}` } : {} },
  },
})

const handleErrors = (error) => {
  loggerService.error(error)
  throw error
}

const axiosHandler = (method, update) => (apiPath, data = undefined) => Promise
  .resolve(getAxiosConfiguration({ method, apiPath, data }))
  .then(axios)
  .then(update)
  .catch(handleErrors)

export {
  axiosHandler,
}
