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
    entertainment: function() {
        app.get("/entertainment", function(req, res) {

            let page = 'entertainment'
            let sql = `SELECT * FROM  product WHERE category = '${page}'`;
            let query = con.query(sql, (err, results) => {
                if (err) throw err;
                console.log(results);
                res.render("category", {
                    title: 'Entertainment:',
                    product: results
                });
            })
        });
        return 'category';
    }
} 