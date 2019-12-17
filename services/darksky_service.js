const fetch = require('node-fetch')

class darkskyService {
  constructor (formattedLatLong) {
    this.formattedLatLong = formattedLatLong
  }

  retreiveForecastDate() {
    return fetch(`https://api.darksky.net/forecast/${process.env.DARKSKY_API_KEY}/${this.formattedLatLong}`)
    .then(response => {
      console.log(response)
      return response.json()
    })
  }
}

module.exports = darkskyService