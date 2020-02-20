const Sequelize = require ('sequelize');
const db = require('./database/db');

const Product = db.define('product',{
    pid: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
      },
    name:{
        type: Sequelize.STRING
    },
    brand_name:{
        type: Sequelize.STRING
    },
    category:{
        type: Sequelize.STRING
    },
    comment:{
        type: Sequelize.STRING
    }
    
    
});

module.exports = Product;