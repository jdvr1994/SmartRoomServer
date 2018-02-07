'use strict'
const authWs = require('../middlewares/authWs')
const AlarmaCtrl = require('../controllers/alarma')
//------------------------ Para alarmaIOT ------------------------------
//----------------------------------------------------------------------
function IOTEvents(io,socket){
    socket.on('signUpAlarma',function(alarma){
      AlarmaCtrl.signUp(alarma)
    })

    socket.on('deleteAlarma', function(alarma){
      AlarmaCtrl.deleteDriver(alarma, function(result){

      })
    });

    socket.on('loginWithCredentials',function(alarma){
      AlarmaCtrl.signIn(alarma, function(result){
        socket.emit('login-response', result.alarma)
        socket.emit('getTokenAuth', {token:result.token})
        socket.join('Alarma');
      })
    })

    //------------- Eventos de autorizacion --------------
    socket.on('loginWithToken',function(driver){
      authWs(driver,function(error,driverId){
        if(error) return socket.emit("tokenFailed",0)
        console.log("Token Driver correcto"+ driverId)
          getDriver(driverId,function(err,alarma){
          socket.emit('login-response', alarma)
          socket.join('Alarma')
        })
      })
    })

    socket.on('sensorActivado',function(driver){
      authWs(driver,function(error,driverId){
        io.to('androidAlarma').emit('motionDetected',0);
      })
    })
}

//--------------------------- Eventos desde Android --------------------
//----------------------------------------------------------------------
function AndroidEvents(io,socket){
   socket.on('androidConnection', function(data){
     var alarma = JSON.parse(data);
     console.log("Se conecto Android con la alarma: "+data)
     AlarmaCtrl.signIn(alarma, function(error,result){
       if(error!=0) return socket.emit('loginFailed', error);
       socket.emit('loadAlarma', result.alarma);
       socket.join('androidAlarma');
     })
   });

   socket.on('changeStateAlarma', function(data){
       var alarma = JSON.parse(data);
       AlarmaCtrl.updateDriver(alarma, function(result){
         socket.emit('loadAlarma', result.alarma);
         io.to('Alarma').emit('changeStateAlarma',result.alarma);
         console.log(result.alarma)
       })
   });

   socket.on('activarSirena', function(data){
       io.to('Alarma').emit('onAlarma',0);
   });
}



module.exports = {
  IOTEvents,
  AndroidEvents
}
