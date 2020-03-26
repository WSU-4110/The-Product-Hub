//Include all needed packages
var express = require("express"),
	expressSession=require("express-session"),
	mysql= require("mysql"),
	passport= require("passport"),
	//User= require("./models/user"),
	bodyParser= require("body-parser"),
	LocalStrategy= require("passport-local"),
	passportLocalMongoose= require("passport-local-mongoose");
	var alert= require("alert-node");
	const submitForm= require("./SubmitForm.js");

var app= express();
app.use( express.static( "Auth" ) );
app.set('view engine', 'ejs');

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


// 
app.use(bodyParser.json());

//Get data from POST form
app.use(bodyParser.urlencoded({extended : true}));

app.use(express.json());


// //Encode and decode data from session. 
// passport.serializeUser(User.serializeUser());
// passport.deserializeUser(User.deserializeUser());

//Connect to Database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "producthub"
});


//Test connection
con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to database!");
});


/////ROUTES/////

///Default Route to Homepage
app.get("/", function(req, res){
	res.render("home");
});

////Authorization Route///

//User Registeration
app.get("/register", function(req, res){
	res.render("register");
});

app.post("/register", function(req, res){
	var username = req.body.username;
	var password = req.body.password;
	var email	 = req.body.email;

	if (username && email && password)
	{
		//Insert Registeration values
		con.query("INSERT INTO account (username, password, email) VALUE (?, ?, ?)", [username, password, email], function(err, result)      
		{         
		//
			if(err){
				if (err.code="ER_DUP_ENTRY")
			   { 
			   	console.log(err.message);
			   	console.log(err.code);
			   	//Imported alert npm package
			   	alert("Username and/or email exists. Please choose a different one.");
			   }
			   else{
			   	throw err;
			   }
			}                                             
		 
		   else{
		   	console.log("registeration Successful!");
		   		alert("You have registered successfuly. Please login to access our website!");
		   	passport.authenticate("local")(req, res, function(){
				res.redirect("/login");
			});
		   }
		});
		
	}
		
//First argument, pass the username and store to the database
	//Second argument, pass the password to USer.resister, which will hash the password and store the hashes string in the databse
	// User.register(new User({username: req.body.username}), 
	// 	req.body.password, function(err,user){
	// 		if (err){
	// 			console.log(err);
	// 			return res.render('register');
	// 		}

			//Log the user in through local strategy (can be replaces with Twitter or Facebook as well
			
	//});
});


///User Login/// 
app.get("/login", function(req, res){
	res.render("login");
});

app.post('/login', function(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	if (username && password) {
		con.query('SELECT * FROM account WHERE username = ? AND password = ?', 
			[username, password], function(error, results, fields) {
			if (results.length > 0) {
				req.session.loggedin = true;
				req.session.username = username;
				res.redirect("/secret");
			} else {
				res.redirect("/");
				res.send('Incorrect Username and/or Password!');
			}			
			res.end();
		});
	} else {
		res.send('Please enter Username and Password!');
		res.end();
	}
});


//User Log Out
app.get("/logout", function(req, res){
	req.session.destroy();
	console.log("User successfully logged out");
	res.redirect("/login");
});

//Viewing secret page only when logged in
app.get('/secret', function(req, res) {
	if (req.session.loggedin) {
		console.log('Successful');
		res.render("secret");	
	} 
	else {
		res.send('Please login to view this page!');
	}
	res.end();
});

//Get Prouct Form
app.get("/ProductForm", function(req, res){
	if (req.session.loggedin) {
	res.render("ProductForm");
	}
	else{
		alert("You must be logged in to view this page");
		res.redirect("/login");
	}
});


//Search by product name, brand_name or category and display order by T
app.get('/search', function(req, res){

	let { searchToken } = req.query;
	
	let sql = `SELECT * FROM  product WHERE name LIKE '${searchToken}%' OR brand_name LIKE '${searchToken}%' OR category LIKE '${searchToken}%' ORDER BY name `;

	let query = con.query(sql, (err, results) => {
		if(err) throw err;
		console.log(results);
		res.render("search", {
			title: 'Search Results:', 
			product: results
		});
	})
		
});


//QUERY BY CATEGORY ROUTES//

//View Food Category Route
app.get("/food", function(req, res){

	let page = 'food'
	let sql = `SELECT * FROM  product WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		console.log(results);
		res.render("category", {
			title: 'Food:',
			product: results
		});
	})
		
});


app.get("/electronics", function(req, res){

	let page = 'electronics'
	let sql = `SELECT * FROM  product WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		console.log(results);
		res.render("category", {
			title: 'Electronics:',
			product: results
		});
	})
		
});


app.get("/fashion", function(req, res){

	let page = 'fashion'
	let sql = `SELECT * FROM  product WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		console.log(results);
		res.render("category", {
			title: 'Fashion:',
			product: results
		});
	})
		
});


app.get("/entertainment", function(req, res){

	let page = 'entertainment'
	let sql = `SELECT * FROM  product WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		console.log(results);
		res.render("category", {
			title: 'Entertainment:',
			product: results
		});
	})
		
});


app.get("/homeSupplies", function(req, res){

	let page = 'homeSupplies'
	let sql = `SELECT * FROM  product WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		console.log(results);
		res.render("category", {
			title: 'Home Supplies:',
			product: results
		});
	})
		
});

app.get("/other", function(req, res){

	let page = 'other'
	let sql = `SELECT * FROM  product WHERE category = '${page}'`;
	let query = con.query(sql, (err, results) => {
		if(err) throw err; 
		console.log(results);
		res.render("category", {
			title: 'Other:',
			product: results
		});
	})
		
});
// app.get('/search', (req, res) => {

// 	res.render("search")
// 	let { searchToken } = req.query;
  
// 	// Reduce to  lowercase
// 	searchToken = searchToken.valueOf().toLowerCase();
  
  
// 	//Sequelize version of SQL's Like Operator
// 	con.findAll({ where: { name: { [LIKE]: '%' + searchToken + '%' } } })
// 	  .then(p => res.render('search', { p }))
// 	  .catch(err => console.log(err));
//   });

//Link Product Form webpage to Submit Form functionaility
app.post("/ProductForm", submitForm);


//Change port number to 3000
app.listen(3000, function(){
	console.log("Server started...");
});

//Public files
app.use(express.static(__dirname + '/public'));

//Email notification

app.post('/email', (req, res) => {

	//Send email notification

	res.json({message: 'Message received'})
})

