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
const submitReview= function (req, res) {
    var product=req.body.Product;
    var brand=req.body.Brand;
    var category=req.body.Category;
    var remark=req.body.Remark;
    var image= req.body.Image;
    var rating= req.body.Rating;
    var sponsored = req.body.Sponsored;
    var username=req.session.username;    


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


    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png" || file.mimetype == "image/gif") {
        file.mv("public/uploads/" + Date.now() + file.name, function(err) {
            console.log("after move")
            console.log(req.files)

            if (err)
                console.log(err);
            ////Insert from fields into table////
            con.query("INSERT INTO review (name, brand,remark, category, image, sponsored, rating) VALUES (?, ? , ?  , ?, ? , ?, ?)", 
                [product, brand, remark, category,  filePath, sponsored, rating], function(err, result) {

                if (err) throw err;
                console.log("Insert Successful");
                console.log(req.body);

            con.query("INSERT INTO reviewforms (formID, userName) value((SELECT id FROM review WHERE name=?), ?)",
            [product, username], function (err, result) {  
            if (err) throw err;
            console.log("Insert to ReviewForms Successful");
            }
        );
            alert("Review Posted!");
                res.redirect("secret");
                

            });
        });



    } else {

        ////Insert from fields into table////
        con.query("INSERT INTO review (name, brand, remark,category, image, sponsored, rating) VALUES (?, ? , ? , ? , ? , ?, ?)", [product, brand, remark,category, defaultPath, sponsored, rating], function(err, result) {


            if (err) throw err;
            console.log("Wrong format or no picture uploaded");

            con.query("INSERT INTO userforms (formID, userName) value((SELECT id FROM product WHERE name=?), ?)",
            [product, username], function (err, result) {  
            if (err) throw err;
            console.log("Insert to UserForms Successful");
            }
        );

            res.redirect("secret");

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
module.exports = submitReview;