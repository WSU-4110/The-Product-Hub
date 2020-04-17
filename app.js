//Include all needed packages and variables
var express = require("express"),
     mysql = require("mysql");


var app = express();




//Connect to Database
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "testlogin"
});

//Test connection
con.connect(function (err) {
    if (err) throw err;
    console.log("Connected to database!");
});

/////ROUTES/////



///Default Route to Homepage
app.get("/", function (req, res) {
    res.render("home");
});

////Authorization Route///

app.get("/index", function (req, res) {
    res.render("index");
});


app.get('/send', function (req, res) {
   
    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    link = "http://" + req.get('host') + "/verify?id=" + rand;
    mailOptions = {
        to: req.query.to,
        subject: "The Product Hub: Please confirm Your Email Address",
        html: "DO NOT REPLY <br><br>Thank you for choosing The Product Hub! <br> Please click on the link below to verify your email and continue with sign up. <br><a href=" + link + ">Verify Email</a><br><br> The Product Hub Team."
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function (error, response) {
        if (error) {
            console.log(error);
            res.end("error");
        } else {
            email = req.query.to;
            console.log("Email is: " + email);
            console.log("Message sent: " + response.message);
            res.end("sent");
        }
    });
});


app.get("/RequestForm", function (req, res) {
    if (req.session.loggedin) {
        res.render("RequestForm");
    } else {
        alert("You must be logged in to view this page");
        res.redirect("/login");
    }
});


const submitForm = function (req, res) {
    var product = req.body.Product;
    var brand = req.body.Brand;
    var productId = req.body.ID;
    var category = req.body.Category;
    var question = req.body.Question;
    var image = req.body.Image;

    var username = req.session.username;

        con.connect(function (err) {
        
            console.log("connected");
        });
 

    con.query("INSERT INTO product (id, name, brand, question,category,image) VALUES (?, ? , ? , ? , ? , ?)",
        [productId, product, brand, question, category, image], function (err, result) {

            if (err) throw err;
            console.log("Insert Successful");
        });

    con.query("INSERT INTO userforms (formID, userName) value((SELECT id FROM reviewRequest2 WHERE Product=?), ?)",
        [product, username], function (err, result) {
            if (err) throw err;
            console.log("Insert to UserForms Successful");
        }
    );

    alert("Product posted successfully!");
    res.redirect("secret");
 
};


//Test 4
module.exports= ()=>{
app.post("/RequestForm", submitForm);
return true
}

//Viewing Personal Profile page only when logged in

app.get('/profile', function (req, res) {
    if (req.session.loggedin) {


        //Test 3
        module.exports= ()=>{
        res.render("profile", { user: req.session.username, type: someVar });
        return true
    }

    } else {
        alert("You must be logged in to view this page");
        res.redirect("/login");
    }
    res.end();
});

//Viewing others profile pages
app.get('/viewProfile', function (req, res) {
    console.log('Successful');
    res.render("viewProfile", { user: req.session.username });

    function myFunction() {
        var x = req.getElementById("myDIV");
        if (req.session.loggedin) {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }
});



//Test 1-2
module.exports = () => {
    app.get('/search', function (req, res) {

        let { searchToken } = req.query;


        let sql = `SELECT * FROM  product WHERE name LIKE '%${searchToken}%' OR brand LIKE '%${searchToken}%' OR category LIKE '%${searchToken}%' ORDER BY sponsored DESC,name `;

        let query = con.query(sql, (err, results) => {
            if (err) throw err;
            console.log(results);
            res.status(200).render("product", {
                title: 'Search Results:',
                product: results
            });
        })

    });
    return true
};
//For Testing Purposes
app.get('/search', function (req, res) {

    let { searchToken } = req.query;


    let sql = `SELECT * FROM  product WHERE name LIKE '%${searchToken}%' OR brand LIKE '%${searchToken}%' OR category LIKE '%${searchToken}%' ORDER BY sponsored DESC,name `;

    let query = con.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.render("product", {
            title: 'Search Results:',
            product: results
        });
    })

});





app.get("/comment/:id", function (req, res) {

    console.log("comment")
    con.query(`SELECT * FROM  comment
    INNER JOIN product
    ON (comment.product_id = product.product_id)
    WHERE comment.product_id =?`, [req.params.id], (err, result) => {

        res.send(result);


    })

});


//About Us Page
app.get('/about', function (req, res) {
    console.log('About Us');
    res.render("about");
});

//Contact Page
app.get('/contact', function (req, res) {
    console.log('Contact Us');
    res.render("contact");
});


//Test 6
module.exports = () => {
    //Change port number to 3000
    app.listen(8118, function () {
        console.log("Server started...");
    });
    return true;
}