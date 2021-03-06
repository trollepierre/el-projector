module.exports = (sequelize, DataTypes) => sequelize.define('Task', {
  name: DataTypes.STRING,
  description: DataTypes.STRING,
  points: DataTypes.INTEGER,
  createdDate: DataTypes.STRING,
  optimalDate: DataTypes.STRING,
  isDone: DataTypes.BOOLEAN,
  doneDate: DataTypes.STRING,
  priority: DataTypes.STRING,
  benefit: DataTypes.STRING,
  neededTime: DataTypes.STRING,
  epicId: DataTypes.STRING,
  neededMaterial: DataTypes.STRING,
  subTaskIds: DataTypes.STRING,
  masterTaskId: DataTypes.STRING,
}, {})
