var express = require('express');
var app = express();
const bodyParser = require('body-parser');
const Product = require('../models/product');
const ProductCrtl = require('../controllers/product');

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

//------------------------ Ejemplo para API REST de una lista de productos ------------
//-------------------------------------------------------------------------------------
app.get('/api/product', ProductCrtl.getProducts);
app.get('/api/product/:productId', ProductCrtl.getProduct);
app.post('/api/product', ProductCrtl.saveProduct);
app.put('/api/product/:productId',ProductCrtl.updateProduct);
app.delete('/api/product/:productId',ProductCrtl.deleteProduct);

module.exports = app
