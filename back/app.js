var createError = require('http-errors')
var express = require('express')
var bodyParser = require('body-parser')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')

var tasksRouter = require('./src/infrastructure/routes/tasks-routes')
var dbRouter = require('./src/infrastructure/routes/db')
var loginRouter = require('./src/infrastructure/routes/login-routes')

var app = express()

app.use(logger('dev'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(cors())

app.use(express.static(path.join(__dirname, '..', 'front-react', 'build')))

app.use('/api/login', loginRouter)
app.use('/api/tasks', tasksRouter)
app.use('/db', dbRouter)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
})

module.exports = app
