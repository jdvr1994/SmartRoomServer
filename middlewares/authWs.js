'use strict'

const services = require('../Services')

function isAuth(data, next){
  if(!data.token){
    return;
  }
  const token = data.token

  services.decodeToken(token)
    .then(response => {
      next(null,response)
    })
    .catch(response => {
      next(response,null)
    })
}

module.exports = isAuth
