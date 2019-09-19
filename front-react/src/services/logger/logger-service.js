/* eslint-disable no-console */
function error(error) {
  if(process.env.NODE_ENV === 'development') {
    console.error(error.message)
  }
}

export default {
  error,
}

