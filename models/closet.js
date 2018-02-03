'use strict'

const mongoose = require('mongoose')
const Schema = mongoose.Schema
const bcrypt = require('bcrypt-nodejs')
const crypto = require('crypto')

const ClosetSchema = new Schema({
  driverId: { type: String, unique: true, lowercase: true },
  password: { type: String, select: false },
  signupDate: { type: Date, default: Date.now() },
  lastLogin: Date,
  colors : [Number]
})

ClosetSchema.pre('save', (next) => {
  let closet = this
  //if (!user.isModified('password')) return next()
  bcrypt.genSalt(10, (err, salt) => {
    if (err) return next(err)

    bcrypt.hash(closet.password, salt, null, (err, hash) => {
      if (err) return next(err)
      closet.password = hash
      next()
    })
  })
})

module.exports = mongoose.model('Closet', ClosetSchema)
