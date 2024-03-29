'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/db-config')[env];
const db = {};

// let sequelize;
// if (config.use_env_variable) {
//   sequelize = new Sequelize(process.env[config.use_env_variable], config);
// } else {
//   sequelize = new Sequelize(config.database, config.username, config.password, config);
// }

const databases = Object.keys(config.databases);

for (let i = 0; i < databases.length; i++) {
  let database = databases[i];
  let dbPath = config.databases[database];
  db[database] = new Sequelize(dbPath.database, dbPath.username, dbPath.password, dbPath);
  db[database].sync();
}

fs
  .readdirSync(__dirname + '/database-1')
  .filter(file => 
    (file.indexOf('.') !== 0) && 
    (file !== basename) && 
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model =  require(path.join(__dirname, '/database-1', file))(db.Database1, Sequelize.DataTypes);
    db[model.name] = model;
  });

fs
  .readdirSync(__dirname + '/database-2')
  .filter(file => 
    (file.indexOf('.') !== 0) && 
    (file !== basename) && 
    (file.slice(-3) === '.js'))
  .forEach(file => {
    const model =  require(path.join(__dirname, '/database-2', file))(db.Database2, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
