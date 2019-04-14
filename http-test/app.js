const http = require('http')
const qs = require('querystring')

http.createServer((req,res)=>{
    const url = req.url
    const method = req.method
    const path = url.split('?')[0]
    const query = qs.parse(url.split('?')[1])
    res.setHeader('Content-Type', 'application')
    const resData = {
        method, url, path, query
    }
    if(method === 'GET'){
        res.end(JSON.stringify(resData))
    }
    if(method === 'POST'){
        req.on('data', chunk => {
            resData.postData += chunk.toString()
        })
        req.on('end', () => {
            res.end(JSON.stringify(resData))
        })
    } 
    
}).listen(3000)