const querystring = require('querystring')

const handleBlogRouter = require('./src/router/blog')
const handleUserRouter = require('./src/router/user')

const getPostData = (req) =>{
    return new Promise((resolve, reject) => {
        if(req.method !== 'POST'){
            resolve({})
            return
        }
        if(req.headers['content-type'] !== 'application/json'){
            resolve({})
            return
        }
        let postData = ''
        req.on('data', chunk => {
            postData += chunk
        })
        req.on('end', () => {
            if(!postData){
                resolve({})
                return
            }
            resolve(JSON.parse(postData))
        })
    })
}

const serverHandle = (req, res) => {
    res.setHeader('Content-Type', 'application/json')
    console.log(req.method, req.url);

    const url = req.url
    req.path = url.split('?')[0]

    req.query = querystring.parse(url.split('?')[1])

    getPostData(req).then(postData => {
        req.body = postData

        //blog
        const blogResult = handleBlogRouter(req, res)
        if(blogResult){
            blogResult.then(blogData => {
                if(blogData){
                    res.end(JSON.stringify(blogData))
                }
            })
            return
        }

        // const blogData = handleBlogRouter(req, res)
        // if(blogData){
        //     res.end(JSON.stringify(blogData))
        //     return
        // }

        //user
        const userResult = handleUserRouter(req, res)
        if(userResult){
            userResult.then(userData => {
                if(userData){
                    res.end(JSON.stringify(userData))
                }
            })
            return
        }
        // const userData = handleUserRouter(req, res)
        // if(userData){
        //     res.end(JSON.stringify(userData))
        //     return
        // }

        //404
        res.writeHead(404, {'Content-Type': 'text/plain'})
        res.write('404 Not Found\n')
        res.end()
    })



}

module.exports = serverHandle