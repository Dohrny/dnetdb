var express = require('express');
var app = express();
var bodyParser = require('body-parser') //needed for POST requests
var http = require('http')
var path = require('path') //needed to show static files
var mysql = require('mysql')

//connect to database
var connection = mysql.createConnection( {
    host: 'localhost',
    user: 'root',
    password: 'starcraft',
    database: 'mydb'
})

connection.connect()
connection.query('SELECT 1 + 1 AS solution', function(err, rows, fields){
    if (err) throw err
    console.log('the solution is: ', rows[0].solution)
})

//connection.end()

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json()) //bodyparser use json data

//load static files (css, js)
app.use('/public', express.static(path.join(__dirname + '/public')));

//show formentry.html
app.get('/views/formentry.html', function (req, res) {
   res.sendFile( __dirname + "/" + "views/formentry.html" );
})

//get data to be put in db and put that mofo in db
app.post('/views/formentry.html', function(err, req, res) {
    if (err) throw err
    else {
        var addPerson = {
            fname: req.body.forename,
            surname: req.body.surname,
            email: req.body.email,
            role: req.body.role
        }
    }
    connection.query('INSERT INTO registration_table(first_name, last_name, email, role) SET ?', addPerson, function(err, response) {
        if (err) throw err
        res.send('db totally updated')
    })
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})