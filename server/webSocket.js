'use strict'
const app = require('./app');
const config = require('../config');
const Photon = require('../controllers/photon');
const Chat = require('../controllers/chat');
const server = require('http').Server(app);
const io = require('socket.io')(server);

var messages = [{
        id : 1,
        text : "Hola soy el servidor mas pro",
        author : "Servidor"
}];

//---------- Web Socket -----------------------
//---------------------------------------------
io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets');
  Chat.begin(socket);

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

module.exports = server
