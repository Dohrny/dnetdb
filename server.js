var express = require('express');
var app = express();
var bodyParser = require('body-parser') //needed for POST requests
var http = require('http')
var path = require('path') //needed to show static files
var mysql = require('mysql')
var pug = require('pug')

app.set('view engine', 'pug')

//connect to database
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'starcraft',
    database: 'mydb'
})

//used to test connection to db
connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
    if (err) throw err
    console.log('the solution is: ', rows[0].solution)
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) //bodyparser use json data

//load static files (css, js)(views is html stuff)
app.use('/public', express.static(path.join(__dirname + '/public')));
app.use('/views', express.static(path.join(__dirname, 'views')))

//get data to be put in db and put that mofo in db
app.post('/views', function (req, res) {
    console.log(req.body.forename)

    console.log(connection.state)
    
    var fname = req.body.forename
    var lname = req.body.surname
    var email = req.body.email
    var role = req.body.role
    
    var sql = 'INSERT INTO registration_table (first_name, last_name, email, role) VALUES("'+fname+'", "'+lname+'", "'+email+'", "'+role+'")'
    connection.query(sql, function(err, req, res) {
      if (err) throw err
    console.log(connection.state)
    })
    res.sendFile(__dirname + '/views/index.html')
})

app.get('/showdb', function(req, res) {
    console.log("get showdb")
    var sql = 'SELECT * FROM registration_table'
    connection.query(sql, function(err, rows) {
        if (err) throw err
        res.json(rows)
        //console.log("")

        for (var i = 0; i < rows.length; i++) {
            var row = rows[i]
            console.log(row.first_name)
            console.log("test")
        }
    })
})


var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})