// Product Review Request Submit Form 
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
    password: "AstronomyNerd15",
    database: "testlogin"
});

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

//To tell the app that we are exporting this function
//Linking it to App.js
module.exports= submitForm;

