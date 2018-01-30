'use strict'
const Product = require('../models/product');

function getProduct(req, res){
  let productId = req.params.productId;

  Product.findById(productId, function(err, product){
    if(err) return res.status(500).send({mensaje : `Error al realizar la peticion: ${err}`})
    if(!product) return res.status(404).send({mensaje: 'El producto no existe'})

    res.status(200).send({producto: product})
  });
}

function saveProduct(req, res){
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product();
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save(function(err,productStored){
    if(err) res.status(500).send({mensaje : `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({product: productStored})
  })
}

function getProducts(req,res){
  Product.find({}, function(err, products){
    if(err) return res.status(500).send({mensaje : `Error al realizar la peticion: ${err}`})
    if(!products) return res.status(404).send({mensaje: 'No hay ningun producto registrado'})
    res.status(200).send({productos: products});
  })
}

function updateProduct(req,res){
  let productId = req.params.productId;
  let update = req.body

  Product.findByIdAndUpdate(productId, update, function(err, productUpdate){
    if(err) return res.status(500).send({mensaje : `Error al actualizar el producto: ${err}`})
    res.status(200).send({producto: productUpdate})
  });
}

function deleteProduct(req, res){
  let productId = req.params.productId;

  Product.findById(productId, function(err, product){
    if(err) return res.status(500).send({mensaje : `Error al borrar el producto: ${err}`})
    if(!product) return res.status(404).send({mensaje: 'El producto no existe'})

    product.remove(function(err){
      if(err) return res.status(500).send({mensaje : `Error al borrar el producto: ${err}`})
      res.status(200).send({mensaje: 'El producto ha sido eliminado'})
    })

  });
}

module.exports = {
  getProduct,
  saveProduct,
  getProducts,
  updateProduct,
  deleteProduct
}
