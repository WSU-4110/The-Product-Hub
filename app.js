
// We are connecting to MySQL Database using node js and express

var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var app= express(),
    bodyParser= require("body-parser"),
    passport= require("passport"),
    LocalStrategy= require("passport-local");

app.use( express.static( "Auth" ) );
app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));

// //Need to use Passport 
// app.use(passport.initialize());
// app.use(passport.session());

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "adrian123",
    database: "bandhan_producthub"
});

app.get('/', function(request, response)
{
    fetchData(response);
    console.log("Done. Data displayed.");
});

db.connect(function(err))
{
    if(err)
    {throw err; }
    console.log("Connected to the database");
}

function executeQuery(sql,cb)
{
db.query(sql, function(error, result, fields) {
    if(error) 
    {throw error;}
    cb(result);
}} 

//Perform Post request after submitting the form
//app.post('/submitForm');
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
        
        con.query("INSERT INTO reviewRequest2 (Product, Brand, productID, Category, Question, Image) VALUES (?, ? , ? , ? , ? , ?)",
        [product, brand, productId, category, question, image], function (err, result) {

            if (err) throw err;

            console.log("Insert Successful");
            res.send("Form submitted!");
        });
    });
};
module.exports= submitForm;

app.get("/food", function(req, res){

	let page = 'food'
	let sql = `SELECT * FROM  products WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		console.log(results);
		res.render("category", {
			title: 'Food:',
			product: results
		});
	})
		
});


app.get("/electronics", function(req, res){

	let page = 'electronics'
	let sql = `SELECT * FROM  products WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		console.log(results);
		res.render("category", {
			title: 'Electronics:',
			product: results
		});
	})
		
});


app.get("/fashion", function(req, res){

	let page = 'fashion'
	let sql = `SELECT * FROM  products WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		console.log(results);
		res.render("category", {
			title: 'Fashion:',
			product: results
		});
	})
		
});


app.get("/entertainment", function(req, res){

	let page = 'entertainment'
	let sql = `SELECT * FROM  products WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		console.log(results);
		res.render("category", {
			title: 'Entertainment:',
			product: results
		});
	})
		
});


app.get("/home", function(req, res){

	let page = 'home'
	let sql = `SELECT * FROM  products WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		console.log(results);
		res.render("category", {
			title: 'Home Supplies:',
			product: results
		});
	})
		
});

app.get("/other", function(req, res){

	let page = 'other'
	let sql = `SELECT * FROM  products WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		console.log(results);
		res.render("category", {
			title: 'Other:',
			product: results
		});
	})
		
});

//Link Product Form webpage to Submit Form functionaility
app.post("/ProductForm", submitForm);

app.listen(8080, function()
{
    console.log("Listening to Port 8080");
})
