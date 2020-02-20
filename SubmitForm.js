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

//Direct the js file to the Review Request Form webpage
app.get("/", function(req, res){
    console.log("get form success");
    res.render("RequestForm");
});

//get post request from html form
app.get("/submitForm", function(req, res){
    res.render("submitForm");
});

//Perform Post request after submitting the form
app.post('/submitForm', function (req, res) {
    console.log("post success");

    var product=req.body.Product;
    var brand=req.body.Brand;
    var id= req.body.ID;
    var category=req.body.Category;
    var question=req.body.Question;
    var image= req.body.Image;

    con.connect(function (err) {

        if (err) throw err;

        console.log("connected");

        
        con.query("INSERT INTO reviewRequest (Product, Brand, ID, Category, Question, Image) VALUES (?, ? , ? , ? , ? , ?)",
        [product, brand, id, category, question, image], function (err, result) {

            if (err) throw err;

            console.log("Review Request has been sent!");
        });
    });

   
    res.send("Form submitted!");
});


//module.exports = router;

//Run server on port 3000
app.listen(3000, function(){
    console.log("Server started...");
});