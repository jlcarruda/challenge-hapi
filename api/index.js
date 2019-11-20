const Hapi = require('@hapi/hapi')
const blipp = require('blipp')
const laabr = require('laabr')
const crumb = require('@hapi/crumb')
const Inert = require('@hapi/inert')
const HapiSwagger = require('hapi-swagger')
const Vision = require('@hapi/vision')

const routes = require('./routes')
const database = require('./database')

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: 'localhost'
  })

  let plugins = [
    laabr,
    blipp,
    crumb,
    Inert,
    Vision,
    {
      plugin: HapiSwagger,
      options: {
        info: {
          title: 'Test Api Documentation',
          version: '1.0.0'
        }
      }
    }
  ]

  await server.register(plugins)

  routes(server)
  database.connect()

  await server.start()
  return server
}

module.exports = { init }
