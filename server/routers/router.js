const router = require('koa-router')()
const blog = require('./blog-router')

// 装载博客相关子路由
router.use('/blog', blog.routes())


module.exports = router