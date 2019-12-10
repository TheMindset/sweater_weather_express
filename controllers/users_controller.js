const User = require('../models').User

const create = (req, res, next) => {
  console.log(req.body)

  User.create({
    email: req.body.email,
    password: req.body.password
  })
  .then(user => {
    res.setHeader("Content-Type", "application/json")
    res.status(201).send(JSON.stringify(user))
  })
  .catch(error =>  {
    res.setHeader("Content-Type", "application/json")
    res.status(500).send({ error })
  })
}


module.exports = {
  create,
}