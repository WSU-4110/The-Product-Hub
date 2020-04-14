//Include all needed packages and variables
var express = require("express"),
    expressSession = require("express-session"),
    nodemailer = require("nodemailer"),
    mysql = require("mysql"),
    passport = require("passport"),
    User = require("./models/user"),
    bodyParser = require("body-parser"),
    LocalStrategy = require("passport-local"),
    passportLocalMongoose = require("passport-local-mongoose");
var alert = require("alert-node");
var email;
var confirmedEmail;
var someVar;
var category = "";
//var flag= "false";
//const verify= require("./verifyemail.js");

var app = express();
app.use(express.static("Auth"));
app.use(express.static(__dirname + "/images"));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs');

/*
    Here we are configuring our SMTP Server details.
    STMP is mail server which is responsible for sending and recieving email.
*/
var smtpTransport = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'theproducthub20@gmail.com',
        pass: 'ProductHub20'
    }
});
var rand, mailOptions, host, link;
/*------------------SMTP Over-----------------------------*/


//Set up Express Session for login
app.use(expressSession({
    //encode and decode the session
    secret: 'JASFHGSDHFSDHFSDBFIUERIURFWEJFL',
    resave: false,
    saveUninitialized: false
}));

//Need to use Passport
app.use(passport.initialize());
app.use(passport.session());

//Get data from POST form
app.use(bodyParser.urlencoded({ extended: true }));

//Encode and decode data from session. 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Connect to Database
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "bandhan_producthub"
});

//Test connection
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected to database!");
});

/////ROUTES/////



///Default Route to Homepage
app.get("/", function(req, res) {
    res.render("home");
});

////Authorization Route///

app.get("/index", function(req, res) {
    res.render("index");
});


app.get('/send', function(req, res) {
    rand = Math.floor((Math.random() * 100) + 54);
    host = req.get('host');
    link = "http://" + req.get('host') + "/verify?id=" + rand;
    mailOptions = {
        to: req.query.to,
        subject: "The Product Hub: Please confirm Your Email Address",
        html: "DO NOT REPLY <br><br>Thank you for choosing The Product Hub! <br> Please click on the link below to verify your email and continue with sign up. <br><a href=" + link + ">Verify Email</a><br><br> The Product Hub Team."
    }
    console.log(mailOptions);
    smtpTransport.sendMail(mailOptions, function(error, response) {
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

app.get('/verify', function(req, res) {
    console.log(req.protocol + ":/" + req.get('host'));
    if ((req.protocol + "://" + req.get('host')) == ("http://" + host)) {
        console.log("Domain is matched. Information is from Authentic email");
        if (req.query.id == rand) {
            confirmedEmail = email;
            console.log(email);
            console.log("email is verified");
            //res.end("<h1>Email "+mailOptions.to+" is been Successfully verified");
            alert("Email " + mailOptions.to + " has been successfully verified!");
            res.redirect("register");
        } else {
            console.log("email is not verified");
            res.end("<h1>Bad Request</h1>");
        }
    } else {
        res.end("<h1>Request is from unknown source");
    }
});

//User Registeration
app.get("/register", function(req, res) {
    res.render("register", { email: confirmedEmail });
});
app.post("/register", function(req, res) {
    var username = req.body.username;
    var password = req.body.password;
    var userEmail = confirmedEmail;
    if (username && password) {
        //Insert Registeration values
        con.query("INSERT INTO account (username, password, email, type) VALUE (?, ?, ?, 'user')", [username, password, userEmail], function(err, result) {
            if (err) {
                if (err.code = "ER_DUP_ENTRY") {
                    console.log(err.message);
                    console.log(err.code);
                    //Imported alert npm package
                    alert("Username and/or email exists. Please choose a different one.");
                } else {
                    throw err;
                }
            } else {
                console.log("registeration Successful!");
                alert("You have registered successfuly. Please login to access our website!");
                passport.authenticate("local")(req, res, function() {
                    res.redirect("/login");
                });
            }
        });
    }
});

////User Login////
app.get("/login", function(req, res) {
    if (req.session.loggedin) {
        alert("You are aready logged in");
        res.redirect("/secret");
    } else {
        res.render("login");
    }
});
app.post('/login', function(req, res) {

    var username = req.body.username;
    var password = req.body.password;

    if (username && password) {
        con.query('SELECT * FROM account WHERE username = ? AND password = ?', [username, password], function(error, results, fields) {
            if (results.length > 0) {
                req.session.loggedin = true;
                req.session.username = username;
                res.redirect("/secret");
            } else {
                //res.redirect("/");
                res.redirect("/login");
                alert('Incorrect Username and/or Password!');
            }
            res.end();
        });
    } else {
        res.send('Please enter Username and Password!');
        res.end();
    }
});

////User Log Out////
app.get("/logout", function(req, res) {
    req.session.destroy();
    console.log("User successfully logged out");
    res.redirect("/login");
});

//Viewing secret page only when logged in
app.get('/secret', function(req, res) {
    if (req.session.loggedin) {
        console.log('Successful');

        //Get user info to display in profile
        function query() {
            con.query("select type from account where username=?", [req.session.username], function(err, row, results, field) {
                if (err) throw err;
                else {
                    //someVar = JSON.stringify(row);

                    //Return query result as a word
                    someVar = row[0].type;
                    console.log(someVar);

                    /*if (someVar="expert")
                    {
                    	con.query("select category from expertcategory where expertname=?",[req.session.username], function(err, row, results, field) {
                    		if(err) throw err;
                    		category= row[0].category;
                    		console.log(category);
                    		flag="true";
                    	});	

                    }*/
                }
            });
        }
        query();
        res.render("secret");
    } else {
        alert("You must be logged in to view this page");
        res.redirect("/login");
    }
    res.end();
});


//Get Prouct Form
app.get("/ProductForm", function(req, res) {
    if (req.session.loggedin) {
        res.render("ProductForm");
    } else {
        alert("You must be logged in to view this page");
        res.redirect("/login");
    }
});

const submitForm= function (req, res) {
    var product=req.body.Product;
    var brand=req.body.Brand;
    var productId= req.body.ID;
    var category=req.body.Category;
    var question=req.body.Question;
    var image= req.body.Image;

    con.connect(function (err) {
        if (err) throw err;

        console.log("connected");
        
        con.query("INSERT INTO product (id, name, brand, question,category,image) VALUES (?, ? , ? , ? , ? , ?)",
        [productId, product, brand, question,category, image], function (err, result) {

            if (err) throw err;

            console.log("Insert Successful");
            res.send("Form submitted!");
        });
    });
};
app.post('/submitForm');
module.exports= submitForm;

//Link Product Form webpage to Submit Form functionaility
app.post("/ProductForm", submitForm);

//Viewing Personal Profile page only when logged in
app.get('/profile', function(req, res) {
    if (req.session.loggedin) {
        /*if (flag="true")
		{
			res.render("profile", {user: req.session.username, type:someVar, category: category});		
		}
		else
		{
*/
        res.render("profile", { user: req.session.username, type: someVar });
        //}
    } else {
        alert("You must be logged in to view this page");
        res.redirect("/login");
    }
    res.end();
});

//Viewing others profile pages
app.get('/viewProfile', function(req, res) {
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





//Search by product name, brand_name or category and display order by T
app.get('/search', function(req, res) {

    let { searchToken } = req.query;


    let sql = `SELECT * FROM  product WHERE name LIKE '%${searchToken}%' OR brand LIKE '%${searchToken}%' OR category LIKE '%${searchToken}%' ORDER BY name `;

    let query = con.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.render("category", {
            title: 'Search Results:',
            product: results
        });
    })

});



//QUERY BY CATEGORY ROUTES//

//View Food Category Route
app.get("/food", function(req, res) {

    let page = 'food'
    let sql = `SELECT * FROM  product WHERE category = '${page}'`;
    let query = con.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.render("category", {
            title: 'Food:',
            product: results
        });
    })

});


app.get("/electronics", function(req, res) {

    let page = 'electronics'
    let sql = `SELECT * FROM  product WHERE category = '${page}'`;
    let query = con.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.render("category", {
            title: 'Electronics:',
            product: results
        });
    })

});


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


app.get("/home", function(req, res) {

    let page = 'homeSupplies'
    let sql = `SELECT * FROM  product WHERE category = '${page}'`;
    let query = con.query(sql, (err, results) => {
        if (err) throw err;
        console.log(results);
        res.render("category", {
            title: 'Home Supplies:',
            product: results
        });
    })

});

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




//About Us Page
app.get('/about', function(req, res) {
    console.log('About Us');
    res.render("about");
});

//Contact Page
app.get('/contact', function(req, res) {
    console.log('Contact Us');
    res.render("contact");
});

//Change port number to 3000
app.listen(3000, function() {
    console.log("Server started...");
});