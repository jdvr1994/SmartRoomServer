'use strict'

const Alarma = require('../models/alarma')
const service = require('../Services')

function signUp (driver) {
  const alarma = new Alarma({
    user: driver.user,
    password: driver.password,
    stateAlarma : false
  })

  alarma.save((err) => {
    if (err) return console.log({ message: `Error al crear el usuario: ${err}` })
    return console.log({ token: service.createToken(alarma) })
  })
}

function signIn (driver) {
  Alarma.findOne({ user: driver.user }, (err, alarma) => {
    if (err)return console.log({ message: err })
    if (!alarma) return console.log({ message: 'No existe el usuario' })
    alarma.comparePass(driver.password,function(isMatch){
      if(isMatch){
        console.log({
          message: 'Te has logueado correctamente',
          token: service.createToken(closet),
          alarma: alarma
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
