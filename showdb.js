var express = require('express');
var router = express.Router()
//var bodyParser = require('body-parser') //needed for POST requests
var http = require('http')
var path = require('path') //needed to show static files
var mysql = require('./mysql').pool

//render showdb.pug and all the db shit
router.get('/', function (req, res) {
    var personList = []

    var sql = 'SELECT * FROM registration_table'
    mysql.getConnection(function (err, conn) {
        conn.query(sql, function (err, rows) {
            if (err) throw err

            for (var i in rows) {
                var row = rows[i].first_name
                var person = {
                    'first_name': rows[i].first_name,
                    'last_name': rows[i].last_name,
                    'email': rows[i].email,
                    'role': rows[i].role
                }
                personList.push(person)
            }
            res.render('showdb', { 'personList': personList })
        })
    })
})


module.exports = router