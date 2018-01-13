const express = require('express')
const app = module.exports = express()
const path = require('path')

//no slash in front of first 'views' b/c it is a value being set
app.set('views', path.join(__dirname + '/views'))

//need slahs in front of first '/public' cuz it wont work if you dont...
app.use('/public', express.static(__dirname + '/public'))

app.get('/', (req, res) => {
    res.render('index')
})