'use strict'

function begin(socket){
  socket.emit('messages', messages);
}

module.exports = {
  begin
}
