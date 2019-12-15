require('dotenv').config();

const fetch = require('node-fetch')
const User = require('../models').User

const forecastSerializer = require('../serializers/forecast_serializers')

const show = (req, res) => {
  User.findOne({
    where: {
      api_key: req.body.api_key
    }
  })
  .then(user => {
    if(user) {
      fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAPS_API_KEY}&address=${req.query.location}`)
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
        res.setHeader('Content-type', 'application/json')
        res.status(200).send(JSON.stringify({ data: new forecastSerializer(req.query.location, data) }))
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

const formatLatLong = (latLong) => {
  return (String(latLong['lat'] + ',' + String(latLong['lng'])))
}

module.exports = {
  show,
}