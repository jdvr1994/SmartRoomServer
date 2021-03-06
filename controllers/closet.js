'use strict'

const Closet = require('../models/closet')
const service = require('../Services')

function signUp (driver) {
  const closet = new Closet({
    driverId: driver.driverId,
    password: driver.password,
    colors : [0,0,0,0,0]
  })

  closet.save((err) => {
    if (err) return console.log({ message: `Error al crear el usuario: ${err}` })
    return console.log({ token: service.createToken(closet) })
  })
}

function signIn (driver) {
  Closet.findOne({ driverId: driver.driverId }, (err, closet) => {
    if (err)return console.log({ message: err })
    if (!closet) return console.log({ message: 'No existe el usuario' })
    closet.comparePass(driver.password,function(isMatch){
      if(isMatch){
        console.log({
          message: 'Te has logueado correctamente',
          token: service.createToken(closet),
          closet: closet
        })
      }else{
        console.log({message: 'Contraseña incorrecta'})
      }
    })


  })
}

module.exports = {
  signUp,
  signIn
}
