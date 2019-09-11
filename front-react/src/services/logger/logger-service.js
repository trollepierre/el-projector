function error(error) {
// eslint-disable-next-line no-console
  if(process.env.NODE_ENV === 'development') {
    console.error(error.message)
  }
}

export default {
  error,
}

