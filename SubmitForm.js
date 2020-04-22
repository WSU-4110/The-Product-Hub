var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var app= express(),
    bodyParser= require("body-parser"),
    passport= require("passport"),
    LocalStrategy= require("passport-local");
var alert= require("alert-node");
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
    var category=req.body.Category;
    var question=req.body.Question;
    var image= req.body.Image;

    var username=req.session.username;    

    con.connect(function (err) {
          //  if (err) throw err;
            console.log("connected");
        });

        ////Insert from fields into table////
        con.query("INSERT INTO product (id, name, brand, question, category, image) VALUES (53, ?, ? , ? , 'Food', ?)",
            [product, brand, question, category, image], function (err, result) {

            if (err) throw err;
            console.log("Insert Successful");     
        });

        
                ////Link the posted product with the logged in user////
        con.query("INSERT INTO userforms (formID, userName) value((SELECT id FROM product WHERE name=?), ?)",
            [product, username], function (err, result) {  
            if (err) throw err;
            console.log("Insert to UserForms Successful");
            }
        );

        alert("Product posted successfully!");
        res.redirect("secret");     
      

};

//To tell the app that we are exporting this function
//Linking it to app.js
module.exports= submitForm;