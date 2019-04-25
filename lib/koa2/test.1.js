/*
* @Author: Robin
* @Date: 2019-04-16 03:34:48
* @Last Modified by:   robin
* @Last Modified time: 
*/

'use strict';

// const Koa = require('./like-koa2');
//  const Koa = require('./koa2-2');

const Koa = require('koa');

const app = new Koa();
function indent(n){
    return new Array(n).join('&nbsp')
}

const mid1 = () => async (ctx, next) =>{
    // res.setHeader('Content-Type', 'text/html')
    ctx.body = `<h3 style='color:blue'>${indent(1)} 请求 => 第一层中间件</h3>`
    await next()
    ctx.body += `<h3 style='color:blue'>${indent(1)} 响应 <= 第一层中间件</h3>`
}
const mid2 = () => async (ctx, next) =>{
    ctx.body += `<h3 style='color:blue'>${indent(4)} 请求 => 第2层中间件</h3>`
    await next()
    ctx.body += `<h3 style='color:blue'>${indent(4)} 响应 <= 第2层中间件</h3>`
}
const mid3 = () => async (ctx, next) =>{
    ctx.body += `<h3 style='color:blue'>${indent(8)} 请求 => 第3层中间件</h3>`
    await next()
    ctx.body += `<h3 style='color:blue'>${indent(8)} 响应 <= 第3层中间件</h3>`
}
app.use(mid1())
app.use(mid2())
app.use(mid3())
// 模拟登录验证
// async function loginCheck(ctx, next) {
//     ctx.body += `<h3>${indent(16)} 请求 => loginCheck</h3>`
//     await next()
//     ctx.body += `<h3>${indent(16)} 响应 <= loginCheck</h3>`
// }
const loginCheck = () => {
    return async (ctx, next)=>{
        ctx.body += `<h3>${indent(16)} 请求 => loginCheck</h3>`
        await next()
        ctx.body += `<h3>${indent(16)} 响应 <= loginCheck</h3>`
    }
}
// app.use(loginCheck())
app.use(async (ctx, next) => {
    ctx.body += `<h3 style='color:red'>${indent(32)} 请求 => /api/get-cookie</h3>`
})

app.listen(3000, ()=>{
    console.log('koa start 3000..');
})