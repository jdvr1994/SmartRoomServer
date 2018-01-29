
const app = require('./app');

var server = require('http').Server(app);
var io = require('socket.io')(server);
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

const mongoose = require('mongoose');

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
