const User = require('../models').User
const bcrypt = require('bcrypt')

const create = (req, res, next) => {
  console.log(req.body)
  bcrypt.hash(req.body.password, 10, (error, hash) => {
    User.create({
      email: req.body.email,
      password: hash,
      api_key: 0
    })
    .then(user => {
      res.setHeader("Content-Type", "application/json")
      res.status(201).send(JSON.stringify({ "api_key": user.api_key }))
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