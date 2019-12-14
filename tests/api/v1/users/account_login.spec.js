const shell = require('shelljs')
const app = require('../../../../app')
const request = require('supertest')
const User = require('../../../../models').User

describe('Test the account login endpoint', () => {
  beforeAll(() => {
    shell.exec('npx sequelize db:drop')
    shell.exec('npx sequelize db:create')
    shell.exec('npx sequelize db:migrate')


  })

  afterAll(() => {
    shell.exec('npx sequelize db:migrate:undo:all')
  })

  test('should returns a api_key when valid infos are sent', () => {
    User.create({
      email: 'test@test.com',
      password: 'password',
      api_key: 'MZDhD88Ut_C8F_dZxMpH_AJ8cpYlLcdt'
    })
    .then(user => {
      request(app).post("/api/v1/sessions")
      .send({
        email: user.email,
        password: user.password
      })
      .then(response => {
        console.log(response.boy)
        expect(Object.keys(response.body).length).toBe(1)
        expect(Object.keys(response.body.msg)).toContain("api_key")
      })
    })
  })

  test('should return an error when wrong email is sent', () => {
    User.create({
      email: 'test@test.com',
      password: 'password',
      api_key: 'MZDhD88Ut_C8F_dZxMpH_AJ8cpYlLcdt'
    })
    .then(user => {
      request(app).post("/api/v1/users")
      .send({
        email: 'otherTest@test.com',
        password: user.password
      })
      .then(response => {
        console.log(response.body)
        expect(response.body.error).toBe("Email or password incorrect !")
      })
    })
  })

  test('should return an error when wrong password is sent', () => {
    User.create({
      email: 'test@test.com',
      password: 'password',
      api_key: 'MZDhD88Ut_C8F_dZxMpH_AJ8cpYlLcdt'
    })
    .then(user => {
      request(app).post("/api/v1/users")
      .send({
        email: user.email,
        password: '123456'
      })
      .then(response => {
        console.log(response.body)
        expect(response.body.error).toBe("Email or password incorrect !")
      })
    })
  })

})
