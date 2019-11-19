module.exports = (server) => {

  server.route({
    method: "GET",
    path: "/",
    options: {
      handler: (request, h) => {
        return "Hello World"
      },
      tags: [ 'api' ]
    }
  })
}
