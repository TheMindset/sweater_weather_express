const express = require('express')
const bcrypt = require('bcrypt')
const User = require('../models').User


const create = (req, res) => {
  let checkPassword = (incomingPassword, currentPassword) => {
    return bcrypt.compareSync(incomingPassword, currentPassword)
  }

  User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(user => {
    if (user && checkPassword(req.body.password, user.password)) {
      res.setHeader("Content-Type", "application/json")
      res.status(201).send(JSON.stringify({ api_key: user.api_key }))
    } else {
      res.setHeader("Content-Type", "application/json")
      res.status(401).send(JSON.stringify({ error: 'Email or password incorrect !' }))
    }
  })
}


module.exports = {
  create,
}