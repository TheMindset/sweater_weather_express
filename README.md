# Sweater Wheather? Express

## About

Welcome to _Sweater, Weather? Express_! This is a [Turing School of Software & Design](https://turing.io/) project completed during Module 4 of the backend engineering program.This project use Node, Express, Sequelize.  It exposes endpoints that produce weather data for specific locations.

The deployed site's endpoints can be consumed at:

https://sweater-wheather-express.herokuapp.com


## Endpoints

### POST /api/v1/users

Creates a user account, using an email, password, and password_confirmation passed in as form data in the body of the request.

Request:
```
Content-Type: application/json
Accept: application/json

body:
{
  "email": "email@example.com",
  "password": "password"
}
```

Example of expected output:
```
{
  "api_key": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000"
}
```

### POST /api/v1/sessions

Authenticates a user, using an email and password passed in as form data in the body of the request.

Request:
```
Content-Type: application/json
Accept: application/json

body:
{
  "email": "email@example.com",
  "password": "password"
}
```

Example of expected output:
```
{
  "api_key": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000"
}
```

### GET /api/v1/forecast?location=Paris

Returns the current weather for a location, as well as both 8-hour and 7-day forecasts.

Request:
```
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000"
}
```

Example of expected output:
```
{
    "data": {
        "location": "Paris",
        "currently": {
            "time": 1576614962,
            "summary": "Overcast",
            "icon": "cloudy",
            "precipIntensity": 0.0026,
            "precipProbability": 0.29,
            "precipType": "rain",
            "temperature": 48.78,
            "apparentTemperature": 46,
            "dewPoint": 44.43,
            "humidity": 0.85,
            "pressure": 1009.1,
            "windSpeed": 6.19,
            "windGust": 13.07,
            "windBearing": 233,
            "cloudCover": 0.99,
            "uvIndex": 0,
            "visibility": 10,
            "ozone": 349.6
        },
        "hourly": [
            {
                "time": 1576612800,
                "summary": "Overcast",
                "icon": "cloudy",
                "precipIntensity": 0.003,
                "precipProbability": 0.34,
                "precipType": "rain",
                "temperature": 49.46,
                "apparentTemperature": 46.89,
                "dewPoint": 44.56,
                "humidity": 0.83,
                "pressure": 1008.5,
                "windSpeed": 6.25,
                "windGust": 13.14,
                "windBearing": 225,
                "cloudCover": 0.98,
                "uvIndex": 0,
                "visibility": 10,
                "ozone": 351.9
            }
        ],
        "daily": [
            {
                "time": 1576537200,
                "summary": "Light rain starting in the afternoon.",
                "icon": "rain",
                "sunriseTime": 1576568400,
                "sunsetTime": 1576598160,
                "moonPhase": 0.7,
                "precipIntensity": 0.0035,
                "precipIntensityMax": 0.0252,
                "precipIntensityMaxTime": 1576599000,
                "precipProbability": 0.81,
                "precipType": "rain",
                "temperatureHigh": 59.38,
                "temperatureHighTime": 1576588740,
                "temperatureLow": 42.15,
                "temperatureLowTime": 1576652400,
                "apparentTemperatureHigh": 58.88,
                "apparentTemperatureHighTime": 1576588740,
                "apparentTemperatureLow": 40.35,
                "apparentTemperatureLowTime": 1576652400,
                "dewPoint": 45.75,
                "humidity": 0.79,
                "pressure": 1002.6,
                "windSpeed": 7.85,
                "windGust": 33.91,
                "windGustTime": 1576571040,
                "windBearing": 201,
                "cloudCover": 0.98,
                "uvIndex": 1,
                "uvIndexTime": 1576583280,
                "visibility": 10,
                "ozone": 329.6,
                "temperatureMin": 46.49,
                "temperatureMinTime": 1576623600,
                "temperatureMax": 59.38,
                "temperatureMaxTime": 1576588740,
                "apparentTemperatureMin": 44.43,
                "apparentTemperatureMinTime": 1576623600,
                "apparentTemperatureMax": 58.88,
                "apparentTemperatureMaxTime": 1576588740
            }
        ]
    }
}
```

### POST /api/v1/favorites

Creates a new favorite location for a user.

Request:
```
Content-Type: application/json
Accept: application/json

body:
{
  "location": "Kigali",
  "api_key": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000"
}
```

Example of expected output:
```
{
  "message": "Kigali, has been added to your favorites."
}
```

### GET /api/v1/favorites

Lists the current weather for all of a user's favorite locations.

Request:
```
Content-Type: application/json
Accept: application/json

body:
{
  "api_key": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000"
}
```

Example of expected output:
```
{
{
    "data": [
        {
            "location": "Nairobi",
            "currently": {
                "time": 1576652455,
                "summary": "Mostly Cloudy",
                "icon": "partly-cloudy-day",
                "precipIntensity": 0.001,
                "precipProbability": 0.07,
                "precipType": "rain",
                "temperature": 69.36,
                "apparentTemperature": 69.66,
                "dewPoint": 62.22,
                "humidity": 0.78,
                "pressure": 1015.4,
                "windSpeed": 9.99,
                "windGust": 17.73,
                "windBearing": 50,
                "cloudCover": 0.79,
                "uvIndex": 6,
                "visibility": 10,
                "ozone": 244.1
            }
        },
        {
            "location": "Kigali",
            "currently": {
                "time": 1576652455,
                "summary": "Partly Cloudy",
                "icon": "partly-cloudy-day",
                "precipIntensity": 0,
                "precipProbability": 0,
                "temperature": 71.68,
                "apparentTemperature": 72.17,
                "dewPoint": 64.1,
                "humidity": 0.77,
                "pressure": 1014.6,
                "windSpeed": 1.59,
                "windGust": 4.28,
                "windBearing": 6,
                "cloudCover": 0.41,
                "uvIndex": 5,
                "visibility": 10,
                "ozone": 245.9
            }
        }
    ]
}
```

### DELETE /api/v1/favorites

Deletes a favorite location for a user.

Request:
```
Content-Type: application/json
Accept: application/json

body:
{
  "location": "Kigali",
  "api_key": "11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000"
}
```

Example of expected output:
```
status: 204
```

## Local Installation

### Requirements & Technique Stack

Node.js 12.13.1 / Express 4.17.1
Squelize 5.21.2
NPM 6.12.1
Jest 24.9.0 / Superset 1.0.1

### Clone

```
$ git clone https://github.com/alexander-mathieu/whether_sweater_express.git
$ cd whether_sweater_express
$ npm install
```

### Setup Database

```
$ npx sequelize db:create
$ npx sequelize db:migrate
```

Additionally, you'll need:
* A [DARKSKY_API_KEY](https://darksky.net/dev/), and have it defined within a file in the root directory named `.env`.
* A [GOOGLE_MAPS_API_KEY](https://developers.google.com/maps/documentation/embed/get-api-key/), and have it defined within a file in the root directory named `.env`.

### API Exploration

Once installation and database setup are complete, explore the various API endpoints with the following steps:
* From the `sweater_wheather_express` project directory, boot up a server with `$ npm start`
* Open your browser, and visit `http://localhost:3000/`
* Query the available endpoints by appending to `http://localhost:3000/` in your browser

### Running Tests

Tests are implemented with Jest, and can be run with `$ npm test`.

Example of expected output:
```
Test Suites: 4 passed, 4 total
Tests:       15 passed, 15 total
Snapshots:   0 total
Time:        4.725s
Ran all test suites.
```