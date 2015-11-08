const restify = require('restify');
const CookieParser = require('restify-cookies');

// store session state in browser cookie
const cookieSession = require('cookie-session');
const mongoose = require('mongoose');

const server = restify.createServer({
  name: 'lightpress',
  version: '0.0.0'
});

// connection with mongodb
mongoose.connect('mongodb://127.0.0.1:27017/lightpress');

const redirect = require('restify-redirect');
const logger = require('restify-logger');
logger.format('simple-logger', ':method :url :status');

server.use(restify.acceptParser(server.acceptable));
server.use(restify.queryParser());
server.use(CookieParser.parse);
server.use(redirect());
server.use(cookieSession({ keys: ['secret1', 'secret2'] }));
server.use(restify.bodyParser());
server.use(logger('simple-logger'));

//引入路由
require('./route')(server);

server.listen(8009, function() {
  console.log('%s listening at %s', server.name, server.url);
});
