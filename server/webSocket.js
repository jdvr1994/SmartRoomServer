'use strict'
const app = require('./app')
const config = require('../config')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const authWs = require('../middlewares/authWs')


const Chat = require('../WebSocketAPIS/Chat')
const Photon = require('../WebSocketAPIS/Photon')
const Alarma = require('../WebSocketAPIS/Alarma')
const Closet = require('../WebSocketAPIS/Closet')

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
