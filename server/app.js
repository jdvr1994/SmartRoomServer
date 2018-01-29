var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const api = require('../routes')

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

//------------------------ Ejemplo para API REST de una lista de productos ------------
//-------------------------------------------------------------------------------------
app.use('/api',api)
module.exports = app
