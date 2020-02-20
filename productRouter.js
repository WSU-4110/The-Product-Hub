const express = require('express');
const productRouter =  express.Router();
const db = require('./app');
const Product = require('./Product');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

productRouter.get('/product', (req, res) => 
Product.findAll()
    .then(product => {
        res.render('product', {
        product
    });
})
.catch(err => console.log(err)))



//Search
/*productRouter.get('/', (req, res) => {
    let {term} = req.query;

    Product.findAll({where: {name: {[Op.like]:'%' + term +'%'}}})
    .then(product => res.render('product', {product}))
    .catch(err => console.log(err))
})
*/
module.exports = productRouter;