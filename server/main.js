
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
      let date = new Date(moment.tz(Date.now(),"America/Bogota"))

      let d = new Date();
      let utc = d.getTime() + (d.getTimezoneOffset() * 60000);
      let offset = -5;
      let nd = new Date(utc + (3600000*offset));

      console.log("Date: "+date)
      console.log("Date: "+nd)
      console.log("Date moment: "+moment.tz(Date.now(),"America/Bogota").format())
    });
})
