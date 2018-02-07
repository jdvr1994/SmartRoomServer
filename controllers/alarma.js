'use strict'

const Alarma = require('../models/alarma')
const service = require('../Services')

  function signUp (driver) {
    const alarma = new Alarma({
      user: driver.user,
      pass: driver.pass,
      stateAlarma : false
    })

    alarma.save((err) => {
      if (err) return console.log({ message: `Error al crear el usuario: ${err}` })
      return console.log({ token: service.createToken(alarma) })
    })
  }

  function signIn (driver,next) {
    Alarma.findOne({ user: driver.user }, (err, alarma) => {
      if (err)return next(1,null)
      if (!alarma) return next(2,null)
      alarma.comparePass(driver.pass,function(isMatch){
        if(isMatch){
          next(0,{
            message: 'Te has logueado correctamente',
            token: service.createToken(alarma),
            alarma: alarma
          })
        }else{
          console.log({message: 'Contraseña incorrecta'})
          next(3,null)
        }
      })
    })
  }

  function updateDriver(driver,next){
    let driverId = driver._id
    let update = {
      stateAlarma : driver.stateAlarma
    }

    Alarma.findByIdAndUpdate(driverId, update, function(err, alarmaUpdate){
      if(err) return console.log({mensaje : `Error al actualizar el producto: ${err}`})
      alarmaUpdate.stateAlarma = driver.stateAlarma
      next({
        message: 'Stata Alarma Actualizada',
        alarma: alarmaUpdate
      })
    });
  }

  function deleteDriver(driver){
    Alarma.findOne({ user: driver.user }, (err, alarma) => {
      if (err)return console.log({ message: err })
      if (!alarma) return console.log({ message: 'No existe el usuario' })
        alarma.remove(function(err){
          if(err) return console.log({message: 'Error al eliminar'})
          console.log({message: 'driver Eliminado'})
        })
      })
  }

  function getDriver(driverId,next){
    Alarma.findById(driverId, function(err, alarma){
      if(err) return next(error,null)
      next(null,alarma)
    });
  }

module.exports = {
  signUp,
  signIn,
  updateDriver,
  deleteDriver
}
