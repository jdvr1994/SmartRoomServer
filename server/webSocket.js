'use strict'
const app = require('./app')
const config = require('../config')
const Photon = require('../controllers/photon')
const Chat = require('../controllers/chat')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const authWs = require('../middlewares/authWs')
const ClosetCtrl = require('../controllers/closet')

//---------- Web Socket -----------------------
//---------------------------------------------
io.on('connection', function(socket) {
  console.log('Alguien se ha conectado con Sockets')
  Chat.begin(socket)
  Chat.newMessage(socket,io)

  socket.on('disconnect', function(data) {
    console.log("Cliente desconectado")
  })

//------------- Eventos de autorizacion --------------
  socket.on('authorization',function(driver){
    authWs(driver,function(data){
      console.log("Token Driver correcto"+data.driverId)
    })
  })

//---------------- Evento SignUp Driver ---------------------------
  socket.on('signUp',function(driver){
    ClosetCtrl.signUp
  })

  socket.on('vumeter-mode', function(data){
	   var vumeter = JSON.parse(data)
     Photon.setModeVumeter(vumeter.modo)
	   console.log("android OK"+vumeter.modo)
  })



});

module.exports = server
