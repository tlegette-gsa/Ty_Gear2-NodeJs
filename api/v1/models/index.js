/**
 * Model loader script originally generated by Sequelize.
 * Modified to use dotenv (.env) in place of the original config
 * @type {[type]}
 */
'use strict';

var dotenv    = require('dotenv').config();
var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);
var env       = process.env.NODE_ENV || 'development';
var db        = {};

var config = {
  username: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB,
  host: process.env.DB_HOST,
  dialect: process.env.DB_DIALECT,
  dialectOptions: {
    ssl: {
      ca: fs.readFileSync('./certs/ca.pem'),
      key: fs.readFileSync('./certs/client-key.pem'),
      cert: fs.readFileSync('./certs/client-cert.pem')
    }
  },
  // logging: false,
};

var sequelize = new Sequelize(config.database, config.username, config.password, config);

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {
    var model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
