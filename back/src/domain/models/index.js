const fs = require('fs')
const path = require('path')
const Sequelize = require('sequelize')

const basename = path.basename(__filename)
const { env } = require('../../infrastructure/env')

const environment = env('NODE_ENV') || 'development'
const config = require('../db/config.json')[environment]
const { isProduction } = require('../../infrastructure/env/process')

const db = {}

let sequelize

if (isProduction()) {
  sequelize = new Sequelize(env('DATABASE_URL'))
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config)
}

fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js'))
  .forEach(file => {
    const model = sequelize.import(path.join(__dirname, file))
    db[model.name] = model
  })

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db)
  }
})

db.sequelize = sequelize
db.Sequelize = Sequelize

module.exports = db
