const shell = require('shelljs')
const app = require('../../../../app')
const request = require('supertest')
const User = require('../../../../models').User

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  })
  beforeEach(() => {
    shell.exec('npx sequelize db:migrate')
  })
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  })

  describe('Test the account creation endpoint', () => {
    test('should return a 200 status', () => {
      return request(app).get("/")
      .then(response => {
        expect(response.status).toBe(200)
      })
    })
  })


  test('should return an api_key', () =>{
    let userTest = {
      email: "test@gmail.com",
      password: "123456"
    }

    return request(app).post("/api/v1/users")
    .send(userTest)
    .then(response => {
      expect(Object.keys(response.body.msg)).toContain("api_key")
      expect(Object.keys(response.body).length).toBe(1)
    })
  })

  /* TODO */
  // test('should return an error when wrong email is sent', () => {
  //   let userTest = {
  //     email: "testgmail.com",
  //     password: "123456"
  //   }

  //   return request(app).post("/api/v1/users").send(userTest).then(response => {
  //     console.log(response.error)
  //     expect(Object.keys(response.error.errors)).toBe("The email must be valid")
  //   })
  // })
})
