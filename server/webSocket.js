'use strict'
const app = require('./app')
const config = require('../config')
const Photon = require('../controllers/photon')
const Chat = require('../controllers/chat')
const server = require('http').Server(app)
const io = require('socket.io')(server)
const authWs = require('../middlewares/authWs')
const ClosetCtrl = require('../controllers/closet')
const AlarmaCtrl = require('../controllers/alarma')

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
    authWs(driver,function(driverId){
      console.log("Token Driver correcto"+driverId)
    })
  })

//----------------- socket.emit('signIn', {driverId: 'jdvr1994', password: '2134darkjljl'});
//---------------- Evento SignUp Driver ---------------------------
  socket.on('signUp',function(driver){
    ClosetCtrl.signUp(driver)
  })

//---------------- Evento SignIn Driver ---------------------------
  socket.on('signIn',function(driver){
    ClosetCtrl.signIn(driver)
  })


//------------------------ Para alarmaIOT ------------------------------
//----------------------------------------------------------------------
  socket.on('signUpAlarma',function(alarma){
    AlarmaCtrl.signUp(alarma)
  })

  socket.on('loginWithCredentials',function(alarma){
    AlarmaCtrl.signIn(alarma, function(result){
      socket.emit('login-response', result.alarma);
      socket.emit('getTokenAuth', {token:result.token});
      socket.join('Alarma');
    })
  })

  socket.on('sensorActivado',function(driver){
    authWs(driver,function(driverId){
      console.log("Token Driver correcto"+driverId)
      io.to('androidAlarma').emit('motionDetected',0);
    })
  })

 //--------------------------- Eventos desde Android --------------------
 //----------------------------------------------------------------------
  socket.on('androidConnection', function(alarma){
    console.log("Se conecto Android con la alarma: "+alarma)
    AlarmaCtrl.signIn(alarma, function(result){
      socket.emit('loadAlarma', result.alarma);
      socket.join('androidAlarma');
    })
  });

  socket.on('changeStateAlarma', function(data){
      io.to('Alarma').emit('changeStateAlarma',data);
  });
  //----------------------------------------------------------------------

  socket.on('vumeter-mode', function(data){
	   var vumeter = JSON.parse(data)
     Photon.setModeVumeter(vumeter.modo)
	   console.log("android OK"+vumeter.modo)
  })



});

module.exports = server
