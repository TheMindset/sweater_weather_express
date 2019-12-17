const app = require('../../../../app')
const shell = require('shelljs')
const request = require('supertest')

const User = require('../../../../models').User

describe('favorites locations endpoint', () => {
  beforeAll(() => {
    return User.create({
      email: 'test@test.com',
      password: 'password',
      api_key: 'MZDhD88Ut_C8F_dZxMpH_AJ8cpYlLcdt',
      locations: [
        {
          city: 'Paris'
        },
        {
          city: 'Kigali'
        },
        {
          city: 'Nairobi'
        },
      ]
    }, { include: {
        association: 'locations'
      }
    })
  })

  test('should persisted a location when valid a valid api_key is sent', () => {
    return request(app)
    .post('/api/v1/favorites?location=Paris')
    .send({
      api_key: 'MZDhD88Ut_C8F_dZxMpH_AJ8cpYlLcdt'
    })
    .then(response => {
      expect(response.statusCode).toBe(200)
      expect(Object.keys(response.body)).toContain('message')
      expect(response.body.message).toEqual('Paris, has been added to your favorites.');
    })
  })

  test('should not persisted a location when wrong api_key is sent', () => {
    return request(app)
    .post('/api/v1/favorites?location=Paris')
    .send({
      api_key: 'MZDhxxxt_C8F_dZxMpH_AJ8cpYlLcdt'
    })
    .then(response => {
      expect(response.statusCode).toBe(401)
      expect(response.body.error).toEqual('Api_key submit is incorrect');
    })
  })


  test('should returns all favorites locations when valid a valid api_key is sent', () => {
    return request(app)
    .get('/api/v1/favorites')
    .send({
      api_key: 'MZDhD88Ut_C8F_dZxMpH_AJ8cpYlLcdt',
    })
    .then(response => {

      expect(response.statusCode).toBe(200)
      expect(Object.keys(response.body.data[0])).toContain('location');
      expect(response.body.data.length).toEqual(4);

    })
  })

  test('should not returns all favorites locations when a wrong api_key is sent', () => {
    return request(app)
    .get('/api/v1/favorites')
    .send({
      api_key: 'MZDhxxxt_C8F_dZxMpH_AJ8cpYlLcdt'
    })
    .then(response => {
      expect(response.statusCode).toBe(401)
      expect(Object.keys(response.body)).toContain('error')
      expect(response.body.error).toEqual('Api_key submit is incorrect');
    })
  })


  test('should delete a favorite location when valid api_key is sent', () => {
    return request(app)
    .delete('/api/v1/favorites?location=Paris')
    .send({
      api_key: 'MZDhD88Ut_C8F_dZxMpH_AJ8cpYlLcdt'
    })
    .then(response => {
      expect(response.statusCode).toBe(204)
    })
  })

  test('should not delete a favorite location when a wrong api_key is sent', () => {
    return request(app)
    .delete('/api/v1/favorites?location=Paris')
    .send({
      api_key: 'MZDhxxxt_C8F_dZxMpH_AJ8cpYlLcdt'
    })
    .then(response => {
      expect(response.statusCode).toBe(401)
      expect(Object.keys(response.body)).toContain('error')
      console.log(response.body)
      expect(response.body.error).toEqual('Api_key submit is incorrect');
    })
  })
})
