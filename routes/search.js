const express = require ('express');
const router = express.Router();
const con = require('../app');
const Search = require('../models/Search');


router.get('/', (req, res)=> res.send('search'));

module.exports = router;