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


//Bandhan



//Test 2 for app.js functions:
    module.exports=function (){
    app.get("/", function(req, res) {
         res.render("home");
         
    });
    return true;
};

