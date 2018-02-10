
'use strict'

const app = require('./app')
const server = require('./webSocket')
const config = require('../config')
const mongoose = require('mongoose')
const moment = require('moment-timezone')

mongoose.connect(config.db,function(err, res){
    if(err) {
      return console.log(`Error al conectar a la base de datos: ${err}`);
    }
    console.log('Conexion a la base de datos establecida')

    server.listen(config.portServer, function() {
      console.log("Servidor corriendo en http://localhost:"+config.portServer);
      let date = new Date(moment.tz(Date.now(),"America/Bogota").format())
      console.log("Date: "+date)
    });
})
