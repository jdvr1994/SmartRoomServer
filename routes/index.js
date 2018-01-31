'use strict'

const express = require('express')
const ProductCrtl = require('../controllers/product')
const auth = require('../middlewares/auth')
const UserCtrl = require('../controllers/user')
const api = express.Router()

api.get('/product', ProductCrtl.getProducts);
api.get('/product/:productId', ProductCrtl.getProduct);
api.post('/product', ProductCrtl.saveProduct);
api.put('/product/:productId',ProductCrtl.updateProduct);
api.delete('/product/:productId',ProductCrtl.deleteProduct);

api.get('/private',auth,(req,res)=>{
  res.status(200).send({mensaje: 'Tienes acceso'})
});

api.post('/signup',UserCtrl.signup);
api.post('/signin',UserCtrl.signin);

module.exports = api
