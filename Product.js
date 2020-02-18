const Sequelize = require ('sequelize');
const db = require('./database/db');

const Product = db.define('product',{
    name:{
        type: Sequelize.STRING
    },
    brand_name:{
        type: Sequelize.STRING
    },
    pid:{
        type: Sequelize.INTEGER
    },
    category:{
        type: Sequelize.STRING
    },
    question:{
        type: Sequelize.STRING
    }
    , 
        timestamps: false
    
});

module.exports = Product;