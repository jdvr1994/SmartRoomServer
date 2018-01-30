'use strict'
var messages = [{
        id : 1,
        text : "Hola soy el servidor mas pro",
        author : "Servidor"
}];

function begin(socket){
  socket.emit('messages', messages);
}

module.exports = {
  begin
}
