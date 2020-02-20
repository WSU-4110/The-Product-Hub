//Include all needed packages
var express = require("express"),
	expressSession=require("express-session"),
	mysql= require("mysql"),
	passport= require("passport"),
	User= require("./models/user"),
	bodyParser= require("body-parser"),
	LocalStrategy= require("passport-local"),
	passportLocalMongoose= require("passport-local-mongoose");
	var alert= require("alert-node");

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

//Get data from POST form
app.use(bodyParser.urlencoded({extended : true}));

//Encode and decode data from session. 
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//Connect to Database
var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "AstronomyNerd15",
  database: "testlogin"
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


//Change port number to 3000
app.listen(3000, function(){
	console.log("Server started...");
});