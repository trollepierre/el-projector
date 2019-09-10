const dbService = require('../src/infrastructure/services/db-service')
const models = require('../src/domain/models')

// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(() => {
  dbService.init()
})
