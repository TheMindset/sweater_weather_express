const User = require('../models').User
const bcrypt = require('bcrypt')
const src = require('secure-random-string')

const create = (req, res, next) => {
  bcrypt.hash(req.body.password, 10, (error, hash) => {

    User.create({
      email: req.body.email,
      password: hash,
      api_key: src()
    })
    .then(user => {
      let msg = {api_key: user.api_key}
      res.setHeader("Content-Type", "application/json")
      res.status(201).send(JSON.stringify({ msg }))
    })
    .catch(error =>  {
      res.setHeader("Content-Type", "application/json")
      res.status(500).send({ error })
    })
  }) 
}


module.exports = {
  create,
}