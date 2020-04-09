
var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var cors = require('cors');
var bodyParser= require("body-parser");
var passport= require("passport");
var LocalStrategy= require("passport-local");

var app= express(); 
var path = require('path');

app.use( express.static( "Auth" ) );
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(passport.initialize());
app.use(passport.session());

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended : true}));

app.use(express.json());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "bandhan_producthub"
});

app.get('/', function(request, response)
{
    fetchData(response);
    console.log("Done. Data displayed.");
});

con.connect(function(err) {
    if(err)
    {throw err; }
    console.log("Connected to the database");
});

//Perform Post request after submitting the form
app.post('/submitForm');
const submitForm= function (req, res) {
    var product=req.body.Product;
    var brand=req.body.Brand;
    var productId= req.body.ID;
    var category=req.body.Category;
    var question=req.body.Question;
    var image= req.body.Image;

    con.connect(function (err) {
        if (err) throw err;

        console.log("connected");
        
        con.query("INSERT INTO reviewRequest (Product, Brand, productID, Category, Question, Image) VALUES (?, ? , ? , ? , ? , ?)",
        [product, brand, productId, category, question, image], function (err, result) {

            if (err) throw err;

            console.log("Insert Successful");
            res.send("Form submitted!");
        });
    });
};
module.exports= submitForm;

app.get("/food", function(req, res){

	let product = {};
	let page = 'food';
	let sql = `SELECT * FROM  products WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		else {
		product = {print:results};
		res.render("Category", product);
		}
	})
		
});


app.get("/electronics", function(req, res){

	let product = {};
	let page = 'electronics';
	let sql = `SELECT * FROM  products WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		else {
			product = {print:results};
			res.render("Category", product);
			}
	})
		
});


app.get("/fashion", function(req, res){

	let product = {};
	let page = 'fashion';
	let sql = `SELECT * FROM  products WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => 
	{
		if(err) throw err; 
		else {
			product = {print:results};
			res.render("Category", product);
			}
	})
		
});


app.get("/entertainment", function(req, res){

	let product = {};
	let page = 'entertainment';
	let sql = `SELECT * FROM  products WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		else {
			product = {print:results};
			res.render("Category", product);
			}
	})
		
});


app.get("/home", function(req, res){

	let product = {};
	let page = 'home'
	let sql = `SELECT * FROM  products WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		else {
			product = {print:results};
			res.render("Category", product);
			}
	})
		
});

app.get("/other", function(req, res){

	let product = {};
	let page = 'other'
	let sql = `SELECT * FROM  products WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		else {
			product = {print:results};
			res.render("Category", product);
			}
	})
		
});

// Sample for rating
app.get("/rating", function(re, res)
{
	// node let product = {};
	let product = ' ';
	let sql = `SELECT * From rating,products WHERE rating.productID = '${product}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		console.log(results);
		res.render("Rating", {
			title: 'Rating',
			rating: results
		});
	})
		
})

//Link Product Form webpage to Submit Form functionaility
app.post("/ProductForm", submitForm);

//We're on port 8080
app.listen(8080, function()
{
    console.log("Listening to Port 8080"); });
