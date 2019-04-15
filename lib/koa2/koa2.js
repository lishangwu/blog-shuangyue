/*
* @Author: Robin
* @Date: 2019-04-16 03:40:03
* @Last Modified by:   robin
* @Last Modified time: 
*/

'use strict';
const http = require('http')

//组合中间件
function compose(middlewareList) {
    return function (ctx) {
        function dispatch(i) {
            const fn = middlewareList[i]
            try {
                return Promise.resolve( fn(ctx, dispatch.bind(null, i + 1) ) )
            }catch (e) {
                return Promise.reject(e)
            }
        }
        return dispatch(0)
    }
}

class Koa2 {
    constructor(){
        this.middlewareList = []
    }
    use(fn){
        this.middlewareList.push(fn)
        return this
    }
    createContext(req, res){
        const ctx = {
            req,
            res
        }
        ctx.query = req.query
        return ctx
    }
    handleRequest(ctx, fn){
        return fn(ctx)
    }
    callback(){
        const fn = compose(this.middlewareList)
        return (req, res) => {
            const ctx = this.createContext(req, res)
            return this.handleRequest(ctx, fn)
        }
    }
    listen(...args){
        const server = http.createServer(this.callback())
        server.listen(...args)
    }
}

module.exports = Koa2