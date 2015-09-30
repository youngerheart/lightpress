var server = require('web-node-server');
config = {
  'localhost': {
    backend: __dirname + '/lp-content/',
    frondend: __dirname + '/',
    baseTemp: 'index.html'
  }
}

server.start(config);