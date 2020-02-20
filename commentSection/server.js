const http = require('http');
const fs = require('fs');
const con = require("./DBConnection");
const hostname = '127.0.0.1'
const port = '3000'

const server = http.createServer((req,res) => {
    if(req.method == 'GET' && req.url == '/')              // type /secret to be the page after log in **(example)
    {   
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/html');
        fs.createReadStream('./index.html').pipe(res);           // here is the name of the page, i named it index, we can change it later


       
    }
    else if(req.method == 'GET' && req.url == '/stylesheet.css'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/css');
        fs.createReadStream('./stylesheet.css').pipe(res);
    }
    else if(req.method == "GET" && req.url == '/functions.js'){
        res.statusCode = 200;
        res.writeHead(200,{"Content-Type":"text/javascript"});
        fs.createReadStream('./functions.js').pipe(res);
    }
    else if(req.method == "GET" && req.url == '/home'){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'application/json');
        var conn = con.getConnection();

        conn.query('SELECT * FROM comments.comments', function(error,results,fields){
            if(error) throw error;

            var comments = JSON.stringify(results);

            res.end(comments);

        });
        conn.end();
    }
    else if(req.method == "POST" && req.url == "/insert"){
        res.statusCode = 200;
        res.setHeader('Content-Type', 'text/plain');

        var content = '';
        req.on('data', function(data){
            content +=data;

            var obj = JSON.parse(content);
            console.log("username is " + obj.name);
            console.log("comment is " + obj.message);
            var conn = con.getConnection();                              //connetion to the database

            conn.query('INSERT INTO comments.comments (comments.userName , comments.comment) VALUES (?,?)',[obj.name,obj.message], function(error,results,fields){
                if(error) throw error;
   
            });
            conn.end();
        });
    }
    
});

server.listen(port, hostname, () =>{
    console.log('server running at http://' + hostname +':'+ port)
});