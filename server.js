var express = require('express');
var app = express();
var bodyParser = require('body-parser') //needed for POST requests
var http = require('http')
var path = require('path') //needed to show static files
var mysql = require('mysql')

//connect to database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'starcraft',
    database: 'mydb'
})

connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err
    console.log('the solution is: ', rows[0].solution)
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) //bodyparser use json data

//load static files (css, js)
app.use('/public', express.static(path.join(__dirname + '/public')));

//show formentry.html
app.get('/views/formentry.html', function (req, res) {
    res.sendFile(__dirname + "/" + "views/formentry.html");
})

//get data to be put in db and put that mofo in db
app.post('/views/formentry.html', function (req, res) {
    console.log(req.body.forename)

    console.log(connection.state)
    
    var fname = req.body.forename
    var lname = req.body.surname
    var email = req.body.email
    var role = req.body.role
    
    var sql = 'INSERT INTO registration_table (first_name, last_name, email, role) VALUES("'+fname+'", "'+lname+'", "'+email+'", "'+role+'")'
    connection.query(sql, function(err, res) {
      if (err) throw err
    console.log(connection.state)
    })
    
})

var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})