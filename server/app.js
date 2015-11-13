const express = require('express');
const session = require('express-session');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(session({
  secret: 'lightpress',
  saveUninitialized: true,
  resave: true
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

const port = process.env.PORT || 8080;

const apiRouter = express.Router();
const router = express.Router();

// connection with mongodb
mongoose.connect('mongodb://127.0.0.1:27017/lightpress');

//引入路由
require('./apiroute')(apiRouter);
require('./route')(router);

app.use('/api', apiRouter);
app.use('', router);

app.listen(port);
console.log('Magic happens on port ' + port);
