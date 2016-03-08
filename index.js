var Hapi = require('hapi');
var format = require('url').format;

var server = new Hapi.Server();

server.connection({
  port: 8000
});

server.route({
  path: '/',
  method: 'GET',
  handler(req, reply) {
    reply(null, 'redirecting')
      .state('REDIRECTED', 'true')
      .redirect('/kibana/');
  }
})

server.route({
  path: '/kibana/{path*}',
  method: ['*', 'GET'],
  handler: {
    proxy: {
      passThrough: true,
      xforward: true,
      mapUri: function (req, done) {
        var uri = format({
          protocol: 'http:',
          host: 'localhost:5601',
          pathname: '/' + req.path.split('/').slice(2).join('/')
        });
        console.log(uri);
        done(null, uri);
      }
    }
  }
});

server.start(function (err) {
  console.log('Server started at: ' + server.info.uri);
});
