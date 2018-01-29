var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('../models/product');

//--------------------------------- Particle Photon -----------------------------
var deviceID = "2f002f000547343232363230";
var accessToken = "568d5c6368bd5953803c898096987ba1dd5c5ece";
var setMode = "setMode";
var getSound = "getSound";

var messages = [{
        id : 1,
        text : "Hola soy el servidor mas pro",
        author : "Servidor"
}];

app.use(bodyParser.urlencoded({ extended: false}));
app.use(bodyParser.json());
app.use(express.static('public'));

//Una pagina Web en la url localhost:8080/web con parametros nombre y edad
app.get('/web/:nombre&:edad', function(req, res) {
  res.status(200).send({mensaje: `Hola ${req.params.nombre} , tienes ${req.params.edad} años!`});
});


//------------------------ Ejemplo para API REST de una lista de productos ------------
//-------------------------------------------------------------------------------------
app.get('/api/product', function(req, res) {
  Product.find({}, function(err, products){
    if(err) return res.status(500).send({mensaje : `Error al realizar la peticion: ${err}`})
    if(!products) return res.status(404).send({mensaje: 'No hay ningun producto registrado'})
    res.status(200).send({productos: products});
  })
});

app.get('/api/product/:productId', function(req, res) {
  let productId = req.params.productId;

  Product.findById(productId, function(err, product){
    if(err) return res.status(500).send({mensaje : `Error al realizar la peticion: ${err}`})
    if(!product) return res.status(404).send({mensaje: 'El producto no existe'})

    res.status(200).send({producto: product})
  });
});

app.post('/api/product', function(req, res) {
  console.log('POST /api/product')
  console.log(req.body)

  let product = new Product();
  product.name = req.body.name
  product.picture = req.body.picture
  product.price = req.body.price
  product.category = req.body.category
  product.description = req.body.description

  product.save((err,productStored)=>{
    if(err) res.status(500).send({mensaje : `Error al salvar en la base de datos: ${err}`})

    res.status(200).send({product: productStored})
  })
});

app.put('/api/product/:productId',function(req, res){

});

app.delete('/api/product/:productId',function(req, res){
  let productId = req.params.productId;

  Product.findById(productId, function(err, product){
    if(err) return res.status(500).send({mensaje : `Error al borrar el producto: ${err}`})
    if(!product) return res.status(404).send({mensaje: 'El producto no existe'})

    product.remove(function(err){
      if(err) return res.status(500).send({mensaje : `Error al borrar el producto: ${err}`})
      res.status(200).send({mensaje: 'El producto ha sido eliminado'})
    })

  });
});

mongoose.connect('mongodb://localhost:27017/shop',function(err, res){
    if(err) {
      return console.log(`Error al conectar a la base de datos: ${err}`);
    }
    console.log('Conexion a la base de datos establecida...');
});

//---------- Web Socket -----------------------
//---------------------------------------------
io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
  socket.emit('messages', messages);

  socket.on('disconnect', function(data) {
    console.log("Cliente desconectado");
  });

  socket.on('new-message', function(data) {
    messages.push(data);
    io.sockets.emit('messages', messages);
  });

  socket.on('sound-change', function(data){
	var driver = JSON.parse(data);
	setModeVumeter(driver.sonido.boton);
	console.log("android OK"+driver.sonido.boton);
  });
});

server.listen(8080, function() {
  console.log("Servidor corriendo en http://localhost:8080");
});


function setModeVumeter(newValue){
	var requestURL = "https://api.particle.io/v1/devices/" + deviceID + "/" + setMode + "/";
	var xmlHttp = new XMLHttpRequest();
	xmlHttp.open("POST", requestURL, false);
	xmlHttp.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
	xmlHttp.send("params="+newValue+"&access_token="+accessToken);
	return xmlHttp.responseText;
}
