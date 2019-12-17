const geocoderService = require('../services/geocoder_service')
const darkskyService = require('../services/darksky_service')
const forecastSerializer = require('../serializers/forecast_serializers')

const User = require('../models').User

const show = (req, res) => {
  User.findOne({
    where: {
      api_key: req.body.api_key
    }
  })
  .then(user => {
    if(user) {
      let _geocoderService = new geocoderService(req.query.location)
      let formattedLatLong = _geocoderService.retreiveFormattedLocation()
      return formattedLatLong
      .then(formattedLatLong => {
        let _darkskyService = new darkskyService(formattedLatLong)
        let forecastData = _darkskyService.retreiveForecastDate()
        return forecastData
      })
      .then(forecastData => {
        res.setHeader('Content-type', 'application/json')
        res.status(200).send(JSON.stringify({ data: new forecastSerializer(req.query.location, forecastData) }))
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
  show,
}