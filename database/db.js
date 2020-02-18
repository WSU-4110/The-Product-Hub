const Sequelize = require('sequelize');



module.exports = new Sequelize('producthub', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
  });
