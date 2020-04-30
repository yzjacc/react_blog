const router = require('koa-router')()
const articleHandler = require('../controllers/articles-handler')
// const archives = require('../controllers/archives')
// const resume = require('../../resume-master/index')
// const appjs = require('../../resume-master/static/app')


router.get('/getblogs', async (ctx) => {
  ctx.set('Content-Type', 'application')
  ctx.body = await articleHandler.getBlogs()
})

router.get('/getblogs/:page', async (ctx) => {
  const page = ctx.params.page
  ctx.body = await articleHandler.getBlogByPage(page)
})


router.get('/getsingleblog/:id', async (ctx) => {
  const id = ctx.params.id
  ctx.body = await articleHandler.getSingleBlogContent(id)
})

router.get('/plusvisit/:id', async (ctx) => {
  const id = ctx.params.id
  ctx.body = await articleHandler.plusVisit(id)
})

router.get('/gethotarticle', async (ctx) => {
  ctx.body = await articleHandler.hotArticle()
})

router.get('/getlabeltotal', async (ctx) => {
  ctx.body = await articleHandler.labelTotal()
})

router.get('/getlabelblogs/:tag', async (ctx) => {
  const tag = ctx.params.tag
  ctx.body = await articleHandler.getSingleTag(tag)
})

// router.get('/getarchives', async (ctx) => {
//   ctx.set('Content-Type', 'application')
//   ctx.body = await archives.getBlogsArchives()
// })



module.exports = router
