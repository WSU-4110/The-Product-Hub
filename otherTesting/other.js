var express = require("express"),
    expressSession = require("express-session"),
    nodemailer = require("nodemailer"),
    mysql = require("mysql"),
    passport = require("passport"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
var alert = require("alert-node");
var app = express();
module.exports = {
    other: function() {
        app.get("/other", function(req, res) {

            let page = 'other'
            let sql = `SELECT * FROM  product WHERE category = '${page}'`;
            let query = con.query(sql, (err, results) => {
                if (err) throw err;
                console.log(results);
                res.render("category", {
                    title: 'Other:',
                    product: results
                });
            })
        });
        
        return 'category';
    }
} 