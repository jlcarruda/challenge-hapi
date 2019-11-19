const assert = require('chai').assert
const API = require('../api')
const request = require('supertest')

let server

describe('Server Testing', () => {
  before(async () => {
    server = await API.init()
  })

  after(() => {
    server.stop({ timeout: 2000 }).then((err) => {
      process.exit((err) ? 1 : 0)
    })
  })

  it('should validate if server is running', () => {
    request(server.listener).get('/')
      .expect(200, (err, resp) => {
        assert.deepEqual(resp.res.text, 'Hello World')
      })
  })
})