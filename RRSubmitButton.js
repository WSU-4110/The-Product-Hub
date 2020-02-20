var express = require('express');
var router = express.Router();
var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "adrian123",
    database: "bandhan_producthub"
});

router.post('/submitform', function (req, res) {

    console.log(req.body.Product);
    console.log(req.body.Brand);
    console.log(req.body.ID);
    console.log(req.body.Category);
    console.log(req.body.Question);
    console.log(req.body.Image);

    con.connect(function (err) {

        if (err) throw err;

        console.log("connected");

        var sql = "INSERT INTO reviewRequest (Product, Brand, ID, Category, Question, Image) VALUES ('" + req.body.Product + "','" + req.body.Brand + "','" + req.body.ID + "','" + req.body.Category + "','" + req.body.Question + "','" + req.body.Image + "')";
        con.query(sql, function (err, result) {

            if (err) throw err;

            console.log("Review Request has been sent!");
        });
    });

    res.render('index', { title: 'Express' });
});


module.exports = router;
