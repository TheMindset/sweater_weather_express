const app = require('../../../../app')
const request = require('supertest')
const bcrypt = require('bcrypt');

const User = require('../../../../models').User

describe('Test the account login endpoint', () => {

  const _hashedPassword = (password) => {
    let saltRounds = 10;
    return bcrypt.hashSync(password, saltRounds);
  };
  
  describe('account login ', () => {
    test('returns an API key when correct information is passed', () => {
      return User.create({
        email: 'test@test.com',
        password: _hashedPassword('password'),
        apiKey: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000'
      })
      .then(user => {
        return request(app)
        .post('/api/v1/sessions')
        .send({
          email: user.email,
          password: 'password'
        })
      })
      .then(response => {
        expect(response.statusCode).toBe(200);
        console.log(response.body)
        expect(response.body.api_key).toEqual('11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000');
      })
    })
  
    test('returns an error when incorrect email is sent', () => {
      return User.create({
        email: 'test1@test.com',
        password: _hashedPassword('password'),
        apiKey: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000'
      })
      .then(user => {
        return request(app)
        .post('/api/v1/sessions')
        .send({
          email: 'notuserlogin@example.com',
          password: user.password
        })
      })
      .then(response => {
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toEqual('Email or password is incorrect.');
      })
    })
  
    test('returns an error when incorrect password is sent', () => {
      return User.create({
        email: 'test3@test.com',
        password: _hashedPassword('password'),
        apiKey: '11bf5b37-e0b8-42e0-8dcf-dc8c4aefc000'
      })
      .then(user => {
        return request(app)
        .post('/api/v1/sessions')
        .send({
          email: user.email,
          password: 'notuserpassword'
        })
      })
      .then(response => {
        expect(response.statusCode).toBe(401);
        expect(response.body.error).toEqual('Email or password is incorrect.');
      })
    })
  })
})