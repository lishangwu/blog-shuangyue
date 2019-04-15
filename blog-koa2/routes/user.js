const router = require('koa-router')()

const { SuccessModel, ErrorModel } = require('../model/resModel');
const {
    login
} = require('../controller/user')

router.prefix('/api/user')

router.post('/login', async function (ctx, next) {

  const {username, password} = ctx.request.body
  const data = await login(username, password)
    if(data.username){
        ctx.session.username = data.username
        ctx.session.realname = data.realname
        ctx.body = new SuccessModel('login ok')
        return
    }else{
        ctx.body = new ErrorModel('login err')
    }

})

router.get('/login-test', async function (ctx, next) {

    if(ctx.session.viewCount == null){
        ctx.session.viewCount = 0
    }
    ctx.session.viewCount ++
    ctx.body = {
      viewCount: ctx.session.viewCount
    }
})

module.exports = router
