'use strict'

const express = require('express')
const ProductCrtl = require('../controllers/product');
const api = express.Router()

api.get('/product', ProductCrtl.getProducts);
api.get('/product/:productId', ProductCrtl.getProduct);
api.post('/product', ProductCrtl.saveProduct);
api.put('/product/:productId',ProductCrtl.updateProduct);
api.delete('/product/:productId',ProductCrtl.deleteProduct);

module.exports = api
