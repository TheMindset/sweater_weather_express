const app = require('../../../../app')
const shell = require('shelljs')
const request = require('supertest')
const bcrypt = require('bcrypt')

const User = require('../../../../models').User


describe('forecast endpoint', () => {

  test('should returns a forecast when valid api_key is sent', () => {
    return User.create({
      email: 'test1@test.com',
      password: 'password',
      api_key: 'MZDhD8EUt_C8F_dZxMpH_AJ8cpYlLcdt'
    })
    .then(user => {
      return request(app)
      .get('/api/v1/forecasts?location=Paris')
      .send({
        api_key: user.api_key
      })
      .then(response => {
        console.log(response.statusCode)
        expect(response.statusCode).toBe(200)
        expect(Object.keys(response.body)).toContain('data')
        expect(Object.keys(response.body.data)).toContain('location');
        expect(Object.keys(response.body.data)).toContain('currently');
        expect(Object.keys(response.body.data)).toContain('hourly');
        expect(Object.keys(response.body.data)).toContain('daily');
  
        expect(response.body.data.hourly.length).toEqual(8);
        expect(response.body.data.daily.length).toEqual(8);
      })
    })
  })

  test('should returns an error message when wrong api_key is sent ', () => {
    User.create({
      email: 'test@test.com',
      password: 'password',
      api_key: 'MZDhD88Ut_C8F_dZxMpH_AJ8cpYlLcdt'
    })
    .then(user => {
      return request(app)
      .get('/api/v1/forecasts?location=Paris')
      .send({
        api_key: 'MZssDxxxx_C8F_dZxMddsd_AJ8cpYlLcdt'
      })
      .then(response => {
        expect(response.statusCode).toBe(401)
        expect(response.body.error).toEqual('Api_key submit is incorrect')
      })
    })
  })
})