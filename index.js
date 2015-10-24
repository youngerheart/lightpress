var express = require('express');
var http = require('http');
var path = require('path');

var app = express();

// 设置默认端口
app.set('port', process.env.PORT || 3000);
// 设置view的绝对路径
app.set('views', path.join(__dirname, 'views'));
// 设置模板引擎
app.set('view engine', 'jade');

// 所有请求被all接收，并且匹配所有路由
app.all('/', function(req, res) {
  res.render('page/index', {
    articles: []
  })
});

var server = http.createServer(app);

var boot = function() {
  server.listen(app.get('port'), function() {
    console.log('server start at port ' + app.get('port'));
  })
}

if(require.main === module) {
  boot();
}

module.exports = {
  boot: boot,
  shutdown: function() {
    server.close();
  },
  port: app.get('port')
};
