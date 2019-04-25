const http = require('http')

function compose(middlewareList){
    return function (ctx){
        function dispatch(i){
            const fn = middlewareList[i]
            try{
                return Promise.resolve(fn(ctx, dispatch.bind(null, i + 1)))
            }catch(e){
                return Promise.reject(e)
            }
        }
        return dispatch(0)
    }


}

class Koa{
    constructor(){
        this.middlewareList = []
    }

    use(fn){
        this.middlewareList.push(fn)
        return this
    }
    createContext(req, res){
        const ctx = {req, res}
        ctx.query = req.query
        return ctx
    }
    handleRequest(ctx, fn){
        return fn(ctx)
    }
    callback(){
        const  fn = compose(this.middlewareList)
        return (req, res) => {
            const ctx = this.createContext(req, res)
            this.handleRequest(ctx, fn)
        }
    }
    listen(...args){
        http.createServer(this.callback()).listen(...args)
    }
}

module.exports = Koa