'use strict'
const config = require('../config')

const app = require('./app')
const server = require('http').Server(app)
const serverHttps = require('https')
const fs = require('fs')
const io = require('socket.io')(server)

const Chat = require('../WebSocketAPIS/Chat')
const Photon = require('../WebSocketAPIS/Photon')
const Alarma = require('../WebSocketAPIS/Alarma')
const Closet = require('../WebSocketAPIS/Closet')

const options = {
  key: fs.readFileSync('/path/to/key.pem'),
  cert: fs.readFileSync('/path/to/cert.pem')
};

https.createServer(options, app).listen(443)
//---------- Web Socket -----------------------
//---------------------------------------------
io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets')
  Chat.begin(socket)
  Chat.newMessage(socket,io)

  Alarma.IOTEvents(io,socket)
  Alarma.AndroidEvents(io, socket)

  Closet.IOTEvents(io, socket)
  Closet.AndroidEvents(io, socket)

  Photon.IOTEvents(io, socket)
  Photon.AndroidEvents(io, socket)

  socket.on('disconnect', function(data) {
    console.log("Cliente desconectado")
  })
});

module.exports = server
