/*
* @Author: Robin
* @Date: 2019-04-16 03:34:48
* @Last Modified by:   robin
* @Last Modified time: 
*/

'use strict';

// const Koa = require('./like-koa2');
const Koa = require('./koa2');

// const Koa = require('koa');

const app = new Koa();

// logger
app.use(async (ctx, next) => {
    console.log('1....')
    await next();
    const rt = ctx['X-Response-Time'];
    // console.log(`${ctx.req.method} ${ctx.req.url} - ${rt}`);
    console.log('1....1')
});

// x-response-time
app.use(async (ctx, next) => {
    console.log('2....')
    const start = Date.now();
    await next();
    const ms = Date.now() - start;
    ctx['X-Response-Time'] = `${ms}ms`;
    console.log('2....2')
});

// response
app.use(async ctx => {
    console.log('3....')
    ctx.res.end('This is like koa2');
    console.log('3....3')
});

app.listen(3000);