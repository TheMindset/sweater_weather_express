const app = require('../../../../app')
const shell = require('shelljs')
const request = require('supertest')

const User = require('../../../../models').User

describe('favorites locations endpoint', () => {
  beforeAll(() => {
    shell.exec("npx sequelize db:drop")
    shell.exec("npx sequelize db:create")
    shell.exec("npx sequelize db:migrate")
  })


  afterAll(() => {
    shell.exec("npx sequelize db:migrate:undo:all")
  })


  test('should persisted a location when valid a valid api_key is sent', () => {
    User.create({
      email: 'test@test.com',
      password: 'password',
      api_key: 'MZDhD88Ut_C8F_dZxMpH_AJ8cpYlLcdt'
    })
    .then(user => {
      request(app)
      .post('/api/v1/favorites?location=Paris')
      .send({
        api_key: user.api_key
      })
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(Object.keys(response.body)).toContain('message')
        expect(Object.keys(response.body.message)).toEqual('Paris, has been added to your favorites');
      })
    }) 
  })

  test('should not persisted a location when wrong api_key is sent', () => {
    User.create({
      email: 'test@test.com',
      password: 'password',
      api_key: 'MZDhD88Ut_C8F_dZxMpH_AJ8cpYlLcdt'
    })
    .then(user => {
      request(app)
      .post('/api/v1/favorites?location=Paris')
      .send({
        api_key: 'MZDhxxxt_C8F_dZxMpH_AJ8cpYlLcdt'
      })
      .then(response => {
        expect(response.statusCode).toBe(401)
        expect(Object.keys(response.body)).toContain('error')
        expect(Object.keys(response.body.error.message)).toEqual('Api_key submit is incorrect');
      })
    }) 

  })


  test('should returns all favorites locations when valid a valid api_key is sent', () => {
    User.create({
      email: 'test@test.com',
      password: 'password',
      api_key: 'MZDhD88Ut_C8F_dZxMpH_AJ8cpYlLcdt'
    })
    .then(user => {
      Location.create({
        city: 'Paris',
        userId: user.id
      })
      request(app)
      .get('/api/v1/favorites')
      .send({
        api_key: user.api_key
      })
      .then(response => {
        expect(response.statusCode).toBe(200)
        expect(Object.keys(response.body.data[0])).toContain('location');
        expect(Object.keys(response.body.data[0].location)).toEqual('Paris');
      })
    }) 

  })

  test('should not returns all favorites locations when a wrong api_key is sent', () => {
    User.create({
      email: 'test@test.com',
      password: 'password',
      api_key: 'MZDhD88Ut_C8F_dZxMpH_AJ8cpYlLcdt'
    })
    .then(user => {
      Location.create({
        city: 'Paris',
        userId: user.id
      })
      request(app)
      .get('/api/v1/favorites')
      .send({
        api_key: 'MZDhxxxt_C8F_dZxMpH_AJ8cpYlLcdt'
      })
      .then(response => {
        expect(response.statusCode).toBe(401)
        expect(Object.keys(response.body)).toContain('error')
        expect(Object.keys(response.body.message)).toEqual('Api_key submit is incorrect');
      })
    }) 
  })


  test('should delete a favorite location when valid a valid api_key is sent', () => {
    User.create({
      email: 'test@test.com',
      password: 'password',
      api_key: 'MZDhD88Ut_C8F_dZxMpH_AJ8cpYlLcdt'
    })
    .then(user => {
      Location.create({
        city: 'Paris',
        userId: user.id
      })
      request(app)
      .delete('/api/v1/favorites?location=Paris')
      .send({
        api_key: 'MZDhxxxt_C8F_dZxMpH_AJ8cpYlLcdt'
      })
      .then(response => {
        expect(response.statusCode).toBe(204)
        expect(Object.keys(response.body)).toContain('message')
        expect(Object.keys(response.body.message)).toEqual('Paris, has been deleted from your favorites');
      })
    }) 
  })

})
