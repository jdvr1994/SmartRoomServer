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
  Closet.find({ driverId: driver.driverId }, (err, closets) => {
    if (err)return console.log({ message: err })
    if (!closets || closets.length==0) return console.log({ message: 'No existe el usuario' })

    bcrypt.compare(driver.password, closets[0].password, function(err, res) {
      if (err)return console.log({ message: err })
      console.log({ message: 'No existe el usuario' , respuesta: res})
    });
    
    console.log({
      message: 'Te has logueado correctamente',
      token: service.createToken(closet),
      closet: closet
    })
  })
}

module.exports = {
  signUp,
  signIn
}
