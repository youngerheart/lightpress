const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const config = require('./config');
const app = express();

// 添加全局依赖
app.locals.moment = require('moment');
app.locals.md = require('marked');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(session({
  secret: 'lightpress',
  saveUninitialized: true,
  resave: true
}));

app.set('views', [__dirname + '/server/views', __dirname + '/themes/' + (config.theme || 'default')]);
app.set('view engine', 'jade');

const apiRouter = express.Router();
const router = express.Router();

// connection with mongodb
mongoose.connect('mongodb://127.0.0.1:27017/lightpress');

//引入路由
require('./server/apiroute')(apiRouter);
require('./server/route')(router);

// 一个静态路由
app.use('/static', express.static(__dirname));
app.use('/api', apiRouter);
app.use('', router);

app.listen(config.port || 8080);
console.log('Magic happens on port ' + config.port || 8080);
