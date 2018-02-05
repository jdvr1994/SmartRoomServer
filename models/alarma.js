'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const AlarmaSchema = new Schema({
  user: { type: String, unique: true,required: true, lowercase: true },
  pass: { type: String, required: true, select: false },
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date,
  stateAlarma : Boolean
})

AlarmaSchema.pre('save', function(next){
  let alarma = this
  if (!alarma.isModified('pass')) return next()
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(alarma.pass, salt, null, (err, hash) => {
      if (err) return next(err)
      alarma.pass = hash
      next()
    })
  })
})

AlarmaSchema.methods.comparePass = function (pass,isMatch) {
  mongoose.model('Alarma', AlarmaSchema).findOne({ user: this.user },'pass', (err, alarma) => {
        bcrypt.compare(pass, alarma.pass, function(err, res) {
          if (err)return console.log({ message: err })
          isMatch(res)
        });
    });

}

module.exports = mongoose.model('Alarma', AlarmaSchema)
