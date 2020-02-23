const Sequelize = require('sequelize');
const db = require('../config/database');

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING
  },
  brand_name: {
    type: Sequelize.STRING
  },
  category: {
    type: Sequelize.STRING
  },
  question: {
    type: Sequelize.STRING
  },
  image: {
    type: Sequelize.STRING
  }
})

module.exports = Product;