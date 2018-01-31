'use strict'

const mongoose = require('mongoose')
const User = require('../models/user')
const service = require('../Services')

function signUp(req, res){
  const User = new User({
    email : req.body.email,
    displayName : req.body.displayName,
  })

  user.save((err) =>{
    if(err) res.status(500).send({mensaje : `Error al crear el Usuario: ${err}`})

    res.status(200).send({token : service.createToken(user)})
  })

}

function signIn(req, res){
  User.find({email: req.body.email},(err,user)=>{
    if(err) return res.status(500).send({mensaje: err})
    if(!user) return res.status(404).send({mensaje: 'No existe este usuario'})
    req.user = user
    res.status(200).send({
      mensaje: 'Te has logeado correctamente'
      token : service.createToken(user)
    })
  })
}

module.exports = {
  signUp,
  signIn
}
