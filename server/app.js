const Koa = require('koa')
const path = require('path')
const koaStatic = require('koa-static')
const router = require('./routers/router')
const bodyParser = require('koa-bodyparser')
const cors = require('koa2-cors')
const https = require('https')
const fs = require('fs')
const sslify = require('koa-sslify').default
const { getData,deleteAllTable } = require('./services/db')
const { updateBlog, getBlogs, getBlogByPage, } = require('./controllers/articles-handler')
const _isSSL = false;


const app = new Koa()
deleteAllTable()
updateBlog()

// 允许跨域的
app.use(cors({
  origin: function (ctx) {
    return "*" // 允许来自所有域名请求
    // return "http://localhost:8090" // 这样就能只允许 http://localhost:8080 这个域名的请求了
  },
  exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
  maxAge: 5,
  credentials: true, // 当设置成允许请求携带cookie时，需要保证"Access-Control-Allow-Origin"是服务器有的域名，而不能是"*";
  allowMethods: ['GET', 'POST', 'DELETE'],
  allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}))

app.use(bodyParser())

app.use(router.routes()).use(router.allowedMethods())

app.use(koaStatic(path.join(__dirname, '../dist')))


if (_isSSL) {
  // 强制转化 http 请求为 https
  app.use(sslify());

  const options = {
    key: fs.readFileSync(path.join(__dirname, '../ssl/ssl.key')),
    cert: fs.readFileSync(path.join(__dirname, '../ssl/ssl.crt'))
  }

  https.createServer(options, app.callback()).listen(443, () => {
    console.log(`Server is running at 443 port with SSL`)
  })
} else {
  app.listen(80, () => {
    console.log(`Server is running at 80 port`)
  })
}

