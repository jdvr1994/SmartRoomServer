'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const AlarmaSchema = new Schema({
  user: { type: String, unique: true,required: true, lowercase: true },
  password: { type: String, required: true, select: false },
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date,
  stateAlarma : Boolean
})

AlarmaSchema.pre('save', function(next){
  let alarma = this
  if (!alarma.isModified('password')) return next()
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(alarma.password, salt, null, (err, hash) => {
      if (err) return next(err)
      alarma.password = hash
      next()
    })
  })
})

AlarmaSchema.methods.comparePass = function (password,isMatch) {
  mongoose.model('Alarma', AlarmaSchema).findOne({ user: this.user },'password', (err, alarma) => {
        bcrypt.compare(password, alarma.password, function(err, res) {
          if (err)return console.log({ message: err })
          isMatch(res)
        });
    });

}

module.exports = mongoose.model('Alarma', AlarmaSchema)
