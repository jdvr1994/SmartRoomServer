
const app = require('./app');
const config = require('../config');
var server = require('http').Server(app);
var io = require('socket.io')(server);

const mongoose = require('mongoose');

const Photon = require('../controllers/photon');

var messages = [{
        id : 1,
        text : "Hola soy el servidor mas pro",
        author : "Servidor"
}];

mongoose.connect(config.db,function(err, res){
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
     Photon.setModeVumeter(driver.sonido.boton);
	   console.log("android OK"+driver.sonido.boton);
  });
});

server.listen(config.portServer, function() {
  console.log("Servidor corriendo en http://localhost:"+config.portServer);
});
