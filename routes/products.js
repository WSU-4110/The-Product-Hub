const express = require('express');
const router = express.Router();
const db = require('../config/database');
const Product = require('../models/Product');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Get product list
router.get('/', (req, res) =>
  Product.findAll()
    .then(products => res.render('products', {
      products
    }))
    .catch(err => console.log(err)));

// Display add product form
router.get('/add', (req, res) => res.render('add'));

// Add a product
router.post('/add', (req, res) => {
  let { name, brand_name, category, question, contact_email } = req.body;
  let errors = [];

  // Validate Fields
  if (!name) {
    errors.push({ text: 'Please add a name' });
  }
  if (!brand_name) {
    errors.push({ text: 'Please add some brand_name' });
  }
  if (!question) {
    errors.push({ text: 'Please add a question' });
  }
  if (!contact_email) {
    errors.push({ text: 'Please add a contact email' });
  }

  // Check for errors
  if (errors.length > 0) {
    res.render('add', {
      errors,
      name,
      brand_name,
      category,
      question,
      contact_email
    });
  } else {
    if (!category) {
      category = 'Unknown';
    } else {
      category = `$${category}`;
    }

    // Make lowercase and remove space after comma
    brand_name = brand_name.toLowerCase().replace(/, /g, ',');

    // Insert into table
    Product.create({
      name: name,
      brand_name: brand_name,
      category: category,
      question: question,
      image: image
    })
      .then(product => res.redirect('/products'))
      .catch(err => console.log(err));
  }
});

// Search for products
router.get('/search', (req, res) => {

  res.render("<h1>Test this</h1>")
  let { searchToken } = req.query;

  // Reduce to  lowercase
 // searchToken = searchToken.valueOf().toLowerCase();


  //Sequelize version of SQL's Like Operator
  Product.findAll({ where: { name: { [Op.like]: '%' + searchToken + '%' } } })
    .then(products => res.render('products', { products }))
    .catch(err => console.log(err));
});

module.exports = router;