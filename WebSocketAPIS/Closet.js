'use strict'
const ClosetCtrl = require('../controllers/closet')

  //----------------- socket.emit('signIn', {driverId: 'jdvr1994', password: '2134darkjljl'});
function IOTEvents(io,socket){
  //---------------- Evento SignUp Driver ---------------------------
    socket.on('signUpCloset',function(driver){
      ClosetCtrl.signUp(driver)
    })

  //---------------- Evento SignIn Driver ---------------------------
    socket.on('signInCloset',function(driver){
      ClosetCtrl.signIn(driver)
    })
}

function AndroidEvents(io, socket){

}

module.exports = {
  IOTEvents,
  AndroidEvents
}
