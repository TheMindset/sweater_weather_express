const geocoderService = require('../services/geocoder_service')
const darkskyService = require('../services/darksky_service')

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
          let formattedLocation = formatLocation(location);
          let _geocoderService = new geocoderService(formattedLocation);

          let formattedLatLong = _geocoderService.retreiveFormattedLocation();
          return formattedLatLong
          .then(formattedLatLong => {
            let _darkskyService = new darkskyService(formattedLatLong);
            let forcastData = _darkskyService.retreiveForecastDate();
            return forcastData
          })
          .then(forecastData => {
            let locationWeather = {}

            locationWeather.location = formattedLocation
            locationWeather.currently = forecastData.currently
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

const formatLocation = (location) => {
  return location.dataValues.city
}


module.exports = {
  create, show, deleteLocation
}