var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var app = express(),
    bodyParser = require("body-parser"),
    passport = require("passport"),
    express = require("express"),
    fileUpload = require("express-fileupload"),
    http = require('http'),
    busboy = require("then-busboy"),
    path = require('path'),

    LocalStrategy = require("passport-local");
var alert = require("alert-node");
app.use(express.static("Auth"));
app.set('view engine', 'ejs');
app.use(fileUpload());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

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
const submitForm = function(req, res) {
    var product = req.body.Product;
    var brand = req.body.Brand;
    var productId = req.body.ID;
    var category = req.body.Category;
    var question = req.body.Question;
    var sponsored = req.body.Sponsored;

    var username = req.session.username;


    con.connect(function(err) {
        //  if (err) throw err;
        console.log("connected");
    });

    if (!req.files)
        return res.status(400).send('No image file was uploaded.');


    var file = req.files.uploaded_image;
    var img_name = file.name;


    var filePath = "/uploads/" + Date.now() + img_name;
    var defaultPath = "public/img/logo.jpeg";

            if (err) throw err;
            console.log("Insert Successful");     
        });

    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
        file.mv("public/uploads/" + Date.now() + file.name, function(err) {
            console.log("after move")
            console.log(req.files)

            if (err)
                console.log(err);
            ////Insert from fields into table////
            con.query("INSERT INTO product (name, brand, productId, category, question, sponsored,image) VALUES (?, ? , ? , ? , ?, ? , ?)", [product, brand, productId, category, question, sponsored, filePath], function(err, result) {

                if (err) throw err;
                console.log("Insert Successful");

            });
        });



    } else {

        ////Insert from fields into table////
        con.query("INSERT INTO product (name, brand, id, category, question, image) VALUES (?, ? , ? , ? , ? , ?)", [product, brand, productId, category, question, defaultPath], function(err, result) {

            if (err) throw err;
            console.log("Wrong format or no picture uploaded");

        });
    }
    /*function two(){
        setTimeout(()=>{*/
    ////Link the posted product with the logged in user////
    // con.query("INSERT INTO userforms (formID, userName) value((SELECT id FROM product WHERE Product=?), ?)", [product, username], function(err, result) {
    //     if (err) throw err;
    //     console.log("Insert to UserForms Successful");
    // });

    // alert("Product posted successfully!");
    // res.redirect("secret");
    /*   });
        }
        two();*/

};


//To tell the app that we are exporting this function
//Linking it to app.js
module.exports = submitForm;
