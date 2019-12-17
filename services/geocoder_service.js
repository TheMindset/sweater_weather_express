const fetch = require('node-fetch')

class geocoderService {
  constructor (location) {
    this.location = location
  }

  retreiveFormattedLocation() {
    return fetch(`https://maps.googleapis.com/maps/api/geocode/json?key=${process.env.GOOGLE_MAPS_API_KEY}&address=${this.location}`)
    .then(response => {
      return response.json()
    })
    .then(data => {
      let latLong = data['results'][0]['geometry']['location']
      let formattedLatLong = formatLatLong(latLong)
      return formattedLatLong
    })
  }
}

const formatLatLong = (latLong) => {
  return (String(latLong['lat'] + ',' + String(latLong['lng'])))
}


module.exports = geocoderService