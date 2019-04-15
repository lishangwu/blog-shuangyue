const router = require('koa-router')()

const { SuccessModel, ErrorModel } = require('../model/resModel');

const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')

const loginCheck = require('../middleware/loginCheck')

router.prefix('/api/blog')

router.get('/list', async function (ctx, next) {
    const query = ctx.query
    const list = await getList(query.author, query.keyword);
    ctx.body = new SuccessModel(list)
})

router.get('/detail', async function (ctx, next) {
    const data = await getDetail(ctx.query.id)
    ctx.body = new SuccessModel(data)
})
router.get('/new', loginCheck, async function (ctx, next) {
    ctx.request.body.author = ctx.session.username
    const result = await newBlog(ctx.request.body)
    ctx.body = new SuccessModel(result)
})
router.get('/update', loginCheck, async function (ctx, next) {
    ctx.request.body.author = ctx.session.username
    const result = await updateBlog(ctx.request.body)
    ctx.body = new SuccessModel(result)
})
router.get('/del', loginCheck, async function (ctx, next) {
    ctx.request.body.author = ctx.session.username
    const val = await delBlog(ctx.query.id,ctx.request.body.author)
    if(val){
        ctx.body = new SuccessModel()
    }else {
        ctx.body = new ErrorModel('del err')
    }
})


module.exports = router
