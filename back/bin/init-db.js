const dbService = require('../src/services/db-service');
var models = require('../src/models');

// sync() will create all table if they doesn't exist in database
models.sequelize.sync().then(() => {
  dbService.init()
})