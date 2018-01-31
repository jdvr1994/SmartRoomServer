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

}

module.exports = {
  signUp,
  signIn
}
