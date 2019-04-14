const querystring = require('querystring')
const { set, get } = require('./src/db/redis')

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
const getCookieExpires = () => {
    const d = new Date()
    d.setTime(d.getTime() + (24 * 60 * 60 * 1000))
    return d.toGMTString()
}


const SESSION_DATA = {}

const serverHandle = (req, res) => {
    res.setHeader('Content-Type', 'application/json')

    const url = req.url
    req.path = url.split('?')[0]
    req.query = querystring.parse(url.split('?')[1])

    //cookie
    req.cookie = {}
    const cookieStr = req.headers.cookie || '' //k1=v1;k2=v2;k3=v3
    cookieStr.split(";").forEach(item => {
        if(!item){
            return
        }
        const arr = item.split('=')
        const key = arr[0].trim()
        const val = arr[1]
        req.cookie[key] = val
    })

    //session
    // let needSetCokkie = false
    // let userId = req.cookie.userid
    // if(userId){
    //     if(!SESSION_DATA[userId]){
    //         SESSION_DATA[userId] = {}
    //     }
    // }else{
    //     needSetCokkie = true
    //     userId = `${Date.now()}_${Math.random()}`
    //     SESSION_DATA[userId] = {}
    // }
    // req.session = SESSION_DATA[userId]

    let needSetCokkie = false
    let userId = req.cookie.userid
    if(!userId){
        needSetCokkie = true
        userId = `${Date.now()}_${Math.random()}`
        set(userId, {})
    }

    req.sessionId = userId
    get(req.sessionId).then(sessionData => {
        if(sessionData == null){
            set(req.sessionId, null)
            req.session = {}
        }else{
            req.session = sessionData
        }

        return getPostData(req)
    })
    .then(postData => {
        req.body = postData

        //blog
        const blogResult = handleBlogRouter(req, res)
        if(blogResult){
            blogResult.then(blogData => {
                if(needSetCokkie){
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
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
                if(needSetCokkie){
                    res.setHeader('Set-Cookie', `userid=${userId}; path=/; httpOnly; expires=${getCookieExpires()}`)
                }
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