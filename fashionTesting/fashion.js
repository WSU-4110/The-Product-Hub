
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
    fashion: function() {
        app.get("/fashion", function(req, res) {

            let page = 'fashion'
            let sql = `SELECT * FROM  product WHERE category = '${page}'`;
            let query = con.query(sql, (err, results) => {
                if (err) throw err;
                console.log(results);
                res.render("category", {
                    title: 'Fashion:',
                    product: results
                });
            })
        });
        
        return 'category';
    }
} 