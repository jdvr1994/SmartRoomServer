'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const ClosetSchema = new Schema({
  driverId: { type: String, unique: true,required: true, lowercase: true },
  password: { type: String, required: true, select: false },
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date,
  colors : [Number]
})

ClosetSchema.pre('save', function(next) => {
  let closet = this
  if (!closet.isModified('password')) return next()
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(closet.password, salt, null, (err, hash) => {
      if (err) return next(err)
      closet.password = hash
      next()
    })
  })
})

ClosetSchema.methods.comparePass = function (password,hash) {
  bcrypt.compare(password, hash, function(err, res) {
    if (err)return console.log({ message: err })
    console.log({ message: 'password correcto' , respuesta: res})
  });
}

module.exports = mongoose.model('Closet', ClosetSchema)
