const express = require ('express');


const app = express();
const bodyParser = require ('body-parser');
const exphbs = require ('express-handlebars');
const path = require('path')


const Sequelize = require('sequelize');

//Database
const db = require('./database/db')

// Body Parser
app.use(bodyParser.urlencoded({ extendGITed: false }));

//Handle bar 
app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//static folder
app.use(express.static(path.join(__dirname,'/public')))

// //Create connection to a testsql for testing this app

// const db = mysql.createConnection({
//   host     : 'localhost',
//   user     : 'root',
//   password : '',
//   database : 'producthub'
// });

//Connect  to database
// db.connect((err) => {
//     if(err){
//         throw err;
//     }
//     console.log('MYSQL is now connected');
//     });

db.authenticate()
  .then(() => console.log ('Database is connected'))
  .catch((err) => console.log(err));

app.listen ('3000', () => {
    console.log('Server started on port 3000');

}); 

//Product Routes
app.use('/search', require('./productRouter'));

// Index route
app.get('/', (req, res) => res.render('index', { layout: 'landing' }));


//Index Route
//app.get('/', (req, res) => res.render('product'));

// app.get('/product', (res, req) => {
//     db.query('SELECT * from product', (err, rows,fields)=>{
//         if(err) throw err;
//         else
//         console.log (rows);
//     })
        

// });


