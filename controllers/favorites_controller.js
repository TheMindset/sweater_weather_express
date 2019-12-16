require('dotenv').config()

const fetch = require('node-fetch')

const User = require('../models').User
const Location = require('../models').Location

const create = (req, res) => {
  User.findOne({
    where: {
      api_key: req.body.api_key
    }
  })
  .then(user => {
    if(user) {
      let city = req.query.location
      console.log(city)

      return Location.create({
        city: city,
        UserId: user.id
      })
      .then(location => {
        res.setHeader('Content-type', 'application/json')
        res.status(200).send(JSON.stringify({ message: `${location.city}, has been added to your favorites.` }))
      })
      .catch(error => {
        res.status(500).send(JSON.stringify({ error: error }))
      })
    } else {
      res.setHeader('Content-type', 'application/json')
      res.status(401).send(JSON.stringify({ error: 'Api_key submit is incorrect' }))
    }
  })
}


module.exports = {
  create,
}