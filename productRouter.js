const express = require('express');
const productRouter =  express.Router();
const db = require('./app');
const Product = require('./Product');
const Sequelize = require('sequelize')
const Op = Sequelize.Op;

productRouter.get('/', (req, res) => 
Product.findAll()
.then(product => {
    console.log(product)
    res.sendStatus(200)
    
})
.catch(err => console.log(err))

);

productRouter.get('/search', (req, res) => {
    const {term} = req.query;

    Product.findAll({where: {category: {[Op.like]:'%' + term +'%'}}})
    .then(product => res.render('product', {product}))
})

module.exports = productRouter;