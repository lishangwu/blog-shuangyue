/*
* @Author: Robin
* @Date: 2019-04-16 00:57:42
* @Last Modified by:   robin
* @Last Modified time: 
*/

'use strict';

// const express = require('./express')
// const express = require('./like-express')

const express = require('express')


// 本次 http 请求的实例
const app = express()

function indent(n){
    return new Array(n).join('&nbsp')
}

const mid1 = () => (req, res, next) =>{
    // res.setHeader('Content-Type', 'text/html')
    res.body = `<h3 style='color:blue'>${indent(1)} 请求 => 第一层中间件</h3>`
    console.log(`<h3 style='color:blue'>${indent(1)} 请求 => 第一层中间件</h3>`)
    next()
    res.body += `<h3 style='color:blue'>${indent(1)} 响应 <= 第一层中间件</h3>`
    console.log(`<h3 style='color:blue'>${indent(1)} 响应 <= 第一层中间件</h3>`)
}
const mid2 = () => (req, res, next) =>{
    res.body += `<h3 style='color:blue'>${indent(4)} 请求 => 第2层中间件</h3>`
    next()
    res.body += `<h3 style='color:blue'>${indent(4)} 响应 <= 第2层中间件</h3>`
}
const mid3 = () => (req, res, next) =>{
    res.body += `<h3 style='color:blue'>${indent(8)} 请求 => 第3层中间件</h3>`
    next()
    res.body += `<h3 style='color:blue'>${indent(8)} 响应 <= 第3层中间件</h3>`
}
app.use(mid1())
app.use(mid2())
app.use(mid3())
// 模拟登录验证
function loginCheck(req, res, next) {
    res.body += `<h3>${indent(16)} 请求 => loginCheck</h3>`
    next()
    res.body += `<h3>${indent(16)} 响应 <= loginCheck</h3>`
}

app.get('/api/get-cookie',loginCheck, (req, res, next) => {
    res.body += `<h3 style='color:red'>${indent(32)} 请求 => /api/get-cookie</h3>`
    res.send(res.body)
    res.body += `<h3 style='color:red'>${indent(32)} 响应 => /api/get-cookie</h3>`
    
})

app.listen(3000, () => {
    console.log('server is running on port 8000')
})