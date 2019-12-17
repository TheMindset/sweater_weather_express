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


const show = (req, res) => {
  User.findOne({
    where: {
      api_key: req.body.api_key
    }
  })
  .then(user => {
    if (user) {
      return user.getLocations()
      .then(locations => {
        let aryOfAllLocationWeather = []

        locations.forEach(location => {
          let formattedLocation = formatLocation(location)

          fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAPS_API_KEY}&address=${formattedLocation}`)
          .then(response => { 
            return response.json()
          })
          .then(data => {
            let latLong = data['results'][0]['geometry']['location']
            let formattedLatLong = formatLatLong(latLong)
            return formattedLatLong
          })
          .then(formattedLatLong => {
            return fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${formattedLatLong}`)
          })
          .then(response => {

            return response.json()
          })
          .then(data => {
            let locationWeather = {}

            locationWeather.location = formattedLocation
            locationWeather.currently = data.currently
            aryOfAllLocationWeather.push(locationWeather)

            if (aryOfAllLocationWeather.length == locations.length) {
              res.setHeader('Content-Type', 'application/json')
              res.status(200).send(JSON.stringify({ data: aryOfAllLocationWeather }))
            }
          })
        })
      }).catch( error => {
        res.status(500).send(JSON.stringify({ error: error }))
      })
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.status(401).send(JSON.stringify({ error: 'Api_key submit is incorrect' }))
    }
  })
}

const deleteLocation = (req, res) => {
  return User.findOne({
    where: {
      api_key: req.body.api_key
    }
  })
  .then(user => {
    if (user) {
      return Location.destroy({
        where: {
          UserId : user.id,
          city: req.query.location
        }
      })
      .then(location => {
        console.log(location)
        res.setHeader('Content-Type', 'application/json')
        res.status(204).send(JSON.stringify({ message: `${req.query.location}, has been deleted from your favorites` }))
      }).catch( error => {
        res.status(500).send(JSON.stringify({ error: error }))
      })
    } else {
      res.setHeader('Content-Type', 'application/json')
      res.status(401).send(JSON.stringify({ error: 'Api_key submit is incorrect' }))
    }
  })
}



const formatLatLong = (latLong) => {
  return (String(latLong['lat'] + ',' + String(latLong['lng'])))
}

const formatLocation = (location) => {
  return location.dataValues.city
}


module.exports = {
  create, show, deleteLocation
}