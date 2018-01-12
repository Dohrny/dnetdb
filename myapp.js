var express = require('express');
var app = express();
var bodyParser = require('body-parser') //needed for POST requests
var http = require('http')
var path = require('path') //needed to show static files
var mysql = require('./mysql').pool
const { check, validationResult } = require('express-validator/check')
//const { matchedData } = require('express-validator/filter')

var showdb = require('./showdb')

app.set('view engine', 'pug')

//used to test connection to db
mysql.getConnection(function (err, conn) {
    conn.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
        if (err) throw err
        console.log('the solution is: ', rows[0].solution)
    })
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json()) //bodyparser use json data

//load static files (css, js)(views is html stuff)
app.use('/public', express.static(path.join(__dirname + '/public')));
app.use('/views', express.static(path.join(__dirname, 'views')))


//to render .pug file 'index'
app.use('/index', function (req, res) {
    res.render('index')
})

app.use('/showdb', showdb)

app.get('/', function (req, res) {
    res.render('index')
})

//get data to put in db and put that mofo in db (validate first)
app.post('/', [
    check('forename', 'give a name').trim().isLength({ min: 1 }).escape(),
    check('surname', 'give last name').trim().isLength({ min: 1 }).escape(),
    check('email', 'wtb email').trim().isEmail().normalizeEmail()
], function (req, res, next) {
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.mapped() })
    }
    var fName = req.body.forename
    var lName = req.body.surname
    var email = req.body.email
    var role = req.body.role

    var sql = 'INSERT INTO registration_table (first_name, last_name, email, role) VALUES("' + fName + '", "' + lName + '", "' + email + '", "' + role + '")'
    mysql.getConnection(function (err, conn) {
        conn.query(sql, function (err, req, res) {
            if (err) throw err
            console.log(conn.state)
        })
        //res.redirect('back')
        res.render('index', {dbUpdate: 'db updated i think'})
    })
})

var server = app.listen(3000, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})
