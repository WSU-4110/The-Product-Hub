const express = require ('express');
const mysql = require ('mysql');

const app = express();
const bodyparser = require ('body-parser');





//Create connection to a testsql for testing this app

const db = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : '',
  database : 'producthub'
});

//Connect  to database
db.connect((err) => {
    if(err){
        throw err;
    }
    console.log('MYSQL is now connected');
    });

app.listen ('3000', () => {
    console.log('Server started on port 3000');

});

app.get('/product', (res, req) => {
    db.query('SELECT * from product', (err, rows,fields)=>{
        if(err) throw err;
        else
        console.log (rows);
    })
        

});


