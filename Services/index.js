'use strict'

const jwt = require('jwt-simple')
const moment = require('moment')
const config = require('../config')

function createToken(object){
  const payload = {
    sub: object._id,
    iat: moment().unix(),
    exp: moment().add(14, 'days').unix()
  }

  return jwt.encode(payload, config.SECRET_TOKEN)
}

function decodeToken(token){
  const decoded = new Promise((resolve,reject)=>{
    try{
      const payload = jwt.decode(token, config.SECRET_TOKEN)

      if(payload.exp <= moment().unix()){
        console.log('401')
        reject({
          status: 401,
          mensaje: 'El token ha expirado'
        })
      }

      resolve(payload.sub)

    }catch(err){
      console.log('500')
      reject({
        status: 500,
        mensaje: 'token invalido'
      })
    }
  })

  return decoded
}

module.exports = {
  createToken,
  decodeToken
}
