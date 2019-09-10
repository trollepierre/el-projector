const fs = require('fs')

function write(object, path) {
  fs.writeFile(path, object, err => {
    if (err) throw err
    // eslint-disable-next-line no-console
    console.log('File saved!')
  })
}

function read(path) {
  return fs.readFile(path, 'utf8', (err, data) => {
    if (err) throw err
    return data
  })
}

module.exports = {
  write,
  read,
}
