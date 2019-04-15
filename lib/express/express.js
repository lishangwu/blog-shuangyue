/*
* @Author: Robin
* @Date: 2019-04-16 00:57:27
* @Last Modified by:   robin
* @Last Modified time: 
*/

/**
 * this.method(arguments)，
 * arguments会被视为一个参数，
 * 只有通过调用apply，
 * 才可以传入这种array-like的arguments。
 *
 * var a = new Object();
 * this.method.apply(a, arguments);
 * 时，就相当于 a.method(arguments) ，
 * 而不再是 this.method(arguments)简单一句，这是一个借用别人方法来调用，自己就不用写这个方法了。。
 *
 *
 //like-express
 1.请求开始... GET /api/get-cookie
 2.处理 cookie ...
 3.处理 /api 路由
 4.get /api 路由
 5.模拟登陆成功
 6.get /api/get-cookie


 //express
 1.请求开始... GET /api/get-cookie
 2.处理 cookie ...
 3.处理 /api 路由
 5.模拟登陆成功
 6.get /api/get-cookie


 * */

'use strict';

const http = require('http')
const slice = Array.prototype.slice

class Express {

    constructor(){
        this.routes = {
            all : [],
            get : [],
            post: []
        }
    }

    register(){
        const info = {}
        if(typeof arguments[0] === 'string'){
            info.path = arguments[0]
            info.stack = slice.call(arguments, 1)
        }else{
            info.path = '/'
            info.stack = slice.call(arguments, 0)
        }
        return info
    }
    use(){
        this.routes.all.push(this.register.apply(this, arguments))
    }
    get(){
        this.routes.get.push(this.register.apply(this, arguments))
    }
    post(){
        this.routes.post.push(this.register.apply(this, arguments))
    }

    // register(args){
    //     const info = {}
    //     if(typeof args[0] === 'string'){
    //         info.path = args[0]
    //         info.stack = slice.call(args, 1)
    //     }else{
    //         info.path = '/'
    //         info.stack = slice.call(args, 0)
    //     }
    //     return info
    // }
    // use(){
    //     this.routes.all.push(this.register(arguments))
    // }
    // get(){
    //     this.routes.get.push(this.register(arguments))
    // }
    // post(){
    //     this.routes.post.push(this.register(arguments))
    // }


    match(method, url){
        let stack = []
        if('/favicon.ico' === url){
            return []
        }
        //GET /api/get-cookie
        this.routes.all.forEach(info => {
            if(url.indexOf(info.path) === 0){
                stack = stack.concat(info.stack)
            }
        })
        this.routes[method].forEach(info => {
            if(info.path === url){
                // console.log('url: ',url)
                stack = stack.concat(info.stack)
            }
        })
        return stack
    }

    handleRequest(req, res, middles){
        function next() {
            const fn = middles.shift()
            if(fn){
                fn(req, res, next)
            }
        }
        next()
    }
    callback() {
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
            }
            const url = req.url
            const method = req.method.toLowerCase()

            const matchs = this.match(method, url)

            this.handleRequest(req, res, matchs)
        }
    }
    listen(...args){
        http.createServer(this.callback()).listen(...args)
    }
}

module.exports = () =>{
    return new Express()
}