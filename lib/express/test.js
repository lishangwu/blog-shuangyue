/*
* @Author: Robin
* @Date: 2019-04-16 00:57:42
* @Last Modified by:   robin
* @Last Modified time: 
*/

'use strict';

const express = require('./express2')
// const express = require('./like-express')

// const express = require('express')


// 本次 http 请求的实例
const app = express()



app.use((req, res, next) => {
    console.log('1.请求开始...', req.method, req.url)
    next()
    console.log('1.请求开始...1', req.method, req.url)

})

app.use((req, res, next) => {
    // 假设在处理 cookie
    console.log('2.处理 cookie ...')
    req.cookie = {
        userId: 'abc123'
    }
    next()
    console.log('2.处理 cookie ...2')

})

app.use('/api', (req, res, next) => {
    console.log('3.处理 /api 路由')
    next()
    console.log('3.处理 /api 路由...3')

})

app.get('/api', (req, res, next) => {
    console.log('4.get /api 路由')
    next()
    console.log('4.get /api 路由...4')

})

// 模拟登录验证
function loginCheck(req, res, next) {
    setTimeout(() => {
        console.log('5.模拟登陆成功')
        next()
        console.log('5.模拟登陆成功...')

    })
}

app.get('/api/get-cookie', loginCheck, (req, res, next) => {
    console.log('6.get /api/get-cookie')
    res.json({
        errno: 0,
        data: req.cookie
    })
})

app.listen(3000, () => {
    console.log('server is running on port 3000')
})