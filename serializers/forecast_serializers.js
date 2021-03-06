class ForecastSerializer {
  constructor(location, forecast) {
    this.location = location
    this.currently = forecast.currently
    this.hourly = forecast.hourly.data.slice(0, 8)
    this.daily = forecast.daily.data.slice(0, 8)
  }
}

module.exports = ForecastSerializer