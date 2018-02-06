'use strict'
var messages = [{
        id : 1,
        text : "Hola soy el servidor mas pro",
        author : "Servidor"
}];

function begin(socket){
  socket.emit('messages', messages);
}

function newMessage(socket,io){
  socket.on('new-message', function(data) {
      messages.push(data);
      io.sockets.emit('messages', messages);
  });
}

module.exports = {
  begin,
  newMessage
}
