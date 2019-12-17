const shell = require('shelljs')
const app = require('../../../../app')
const request = require('supertest')
const User = require('../../../../models').User

describe('Test the account creation endpoint', () => {
  beforeAll(() => {
    return User.create({
      email: 'test@gmail.com',
      password: '123456'
    })
  })


  test('should return a 200 status', () => {
    return request(app).get("/")
    .then(response => {
      expect(response.status).toBe(200)
    })
  })

  test('should returns a api_key when valid infos are sent', () =>{
    return request(app).post("/api/v1/users")
    .send({
      email: 'test1@gmail.com',
      password: '123456'
    })
    .then(response => {
      expect(Object.keys(response.body.msg)).toContain("api_key")
      expect(Object.keys(response.body).length).toBe(1)
    })
  })

  test('should return an error when wrong email is sent', () => {

    return request(app).post("/api/v1/users")
    .send({
      email: "testgmail.com",
      password: "123456"
    })
    .then(response => {
      expect(response.body.error.errors[0].message).toBe("Validation isEmail on email failed")
    })
  })


  test('should return an error when the same email is sent', () => {
    return request(app).post("/api/v1/users")
    .send({
      email: 'test@gmail.com',
      password: "123456"
    })
    .then(response => {
      expect(response.body.error.errors[0].message).toBe('email must be unique')
    })
  })

})
