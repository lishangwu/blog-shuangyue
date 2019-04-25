const http = require('http')

class Express{
    constructor(){
        this.middlewares = {
            all : [],
            get : [],
            post: []
        }
    }

    register(path){
        const info = {}
        if(typeof path === 'string'){
            info.path = path
            info.stack = Array.prototype.slice.call(arguments, 1)
        }else{
            info.path = '/'
            info.stack = Array.prototype.slice.call(arguments, 0)
        }
        return info
    }

    use (){
        this.middlewares.all.push(this.register.apply(this, arguments))
    }
    get (){
        this.middlewares.get.push(this.register.apply(this, arguments))
    }
    post (){
        this.middlewares.post.push(this.register.apply(this, arguments))
    }
    match(url, method){
        let stack = []
        if('/favico.ico' === url){
            return []
        }

        this.middlewares.all.forEach(pathInfo => {
            if(url.indexOf(pathInfo.path) === 0){
                stack = stack.concat(pathInfo.stack)
            }
        })
        this.middlewares[method].forEach(pathInfo => {
            if(url === pathInfo.path){
                stack = stack.concat(pathInfo.stack)
            }
        })

        return stack
    }
    handleRequest(req, res, stack){
        function next(){
            const fn = stack.shift()
            if(fn){
                fn(req, res, next)
            }
        }
        next()
    }
    callback(){
        return (req, res) => {
            res.json = (data) => {
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify(data))
            }
            const url = req.url
            const method = req.method.toLowerCase()
            const stack = this.match(url, method)
            this.handleRequest(req, res, stack)
        }
    }
    listen(...args){
        http.createServer(this.callback()).listen(...args)
    }
}

module.exports = function(){
    return new Express()
}