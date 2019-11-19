const Hapi = require('@hapi/hapi')
const routes = require('./routes')
const blipp = require('blipp')
const laabr = require('laabr')
const crumb = require('@hapi/crumb')
const Inert = require('@hapi/inert')
const HapiSwagger = require('hapi-swagger')
const Vision = require('@hapi/vision')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  await server.register([
    blipp,
    laabr,
    crumb,
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        title: 'Test Api Documentation',
        version: '1.0.0'
      }
    }
  ])

  routes(server)

  await server.start()
}

module.exports = { init }
