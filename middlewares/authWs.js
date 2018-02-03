'use strict'

const services = require('../Services')

function isAuth(data, next){
  if(!data.token){
    return;
  }
  const token = data.token

  services.decodeToken(token)
    .then(response => {
      console.log("Token Driver Correcto"+ response)
      data.driverId = response
      next()
    })
    .catch(response => {
      console.log("Token Driver incorrecto"+ response)
    })
}

module.exports = isAuth
