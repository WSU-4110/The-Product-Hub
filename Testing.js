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


var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "AstronomyNerd15",
    database: "testlogin"
});



//Test 1:
   module.exports= function database(){
        con.connect(function (err) {
          //  if (err) throw err;
            console.log("connected");          
        });
        return "Connected";
    };


/*//Test 2 for app.js functions:
    module.exports=function (){
    app.get("/", function(req, res) {
         res.render("home");
         
    });
    return true;
};


//Test3 for app.js functions:
  module.exports=function (){
    app.get("/index", function(req, res) {
    res.render("index");
});
    return true;
};


//Test4 for app.js functions:
module.exports=function (){
   app.get("/register", function(req, res) {
    res.render("register", { email: confirmedEmail });
});
    return true;
};




//Test5:
const submitForm= function (req, res) {
        alert("Product posted successfully!");
        res.redirect("secret");     
return true;
};
module.exports= submitForm;*/