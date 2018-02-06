'use strict'

const Photon = require('../controllers/photon')

function IOTEvents(io,socket){
  socket.on('vumeter-mode', function(data){
     var vumeter = JSON.parse(data)
     Photon.setModeVumeter(vumeter.modo)
     console.log("android OK"+vumeter.modo)
  })
}

function AndroidEvents(io,socket){

}

module.exports = {
  IOTEvents,
  AndroidEvents
}
