"use strict";

var Koa = require('koa');

var path = require('path');

var koaStatic = require('koa-static');

var router = require('./routers/router');

var bodyParser = require('koa-bodyparser');

var cors = require('koa2-cors');

var https = require('https');

var fs = require('fs');

var sslify = require('koa-sslify')["default"];

var _require = require('./services/db'),
    getData = _require.getData,
    deleteAllTable = _require.deleteAllTable;

var _require2 = require('./controllers/articles-handler'),
    updateBlog = _require2.updateBlog,
    getBlogs = _require2.getBlogs,
    getBlogByPage = _require2.getBlogByPage;

var _isSSL = false;
var app = new Koa();
deleteAllTable();
updateBlog(); // 允许跨域的

app.use(cors({
  origin: function origin(ctx) {
    return "*"; // 允许来自所有域名请求
    // return "http://localhost:8090" // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true,
  // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept']
}));
app.use(bodyParser());
app.use(router.routes()).use(router.allowedMethods());
app.use(koaStatic(path.join(__dirname, '../dist')));
app.use(function _callee(ctx) {
  return regeneratorRuntime.async(function _callee$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          if (ctx.url !== '/index') {
            ctx.response.type = 'html';
            ctx.response.body = fs.createReadStream(path.join(__dirname, '../dist/index.html'));
          }

        case 1:
        case "end":
          return _context.stop();
      }
    }
  });
});

if (_isSSL) {
  // 强制转化 http 请求为 https
  app.use(sslify());
  var options = {
    key: fs.readFileSync(path.join(__dirname, '../ssl/ssl.key')),
    cert: fs.readFileSync(path.join(__dirname, '../ssl/ssl.crt'))
  };
  https.createServer(options, app.callback()).listen(443, function () {
    console.log("Server is running at 443 port with SSL");
  });
} else {
  app.listen(80, function () {
    console.log("Server is running at 80 port");
  });
}
//# sourceMappingURL=app.dev.js.map
