const shell = require('shelljs')
const app = require('../app')
const request = require('supertest')

describe('api', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:create')
  })
  beforeEach(() => {
    shell.exec('npx sequelize db:migrate')
    shell.exec('npx sequelize db:seed:all')
  })
  afterEach(() => {
    shell.exec('npx sequelize db:migrate:seed:undo:all')
    shell.exec('npx sequelize db:migrate:undo:all')
  })

  describe('Test POST /api/v1/users', () => {
    test('should return a 200 status', () => {
      return request(app).get("/")
      .then(response => {
        expect(response.status).toBe(200)
      })
    })
  })

  let userTest = {
    email: "test@gmail.com",
    password: "123456"
  }

  test('should return an api_key', () =>{
    return request(app).post("/api/v1/users")
    .send(userTest)
    .then(response => {
      expect(Object.keys(response.body)).toContain('api_key')
      expect(Object.keys(response.body).length).toBe(1)
    })
  })
})
