const { SuccessModel, ErrorModel } = require('../model/resModel');

const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')

const loginCheck = (req) => {
    if(!req.session.username){
        return Promise.resolve(new ErrorModel('need login'))
    }
}

const handleBlogRouter = (req, res)=>{
    const method = req.method;
    const id = req.query.id

    if(method === 'GET' && req.path === '/api/blog/list'){
        const author = req.query.author
        const keyword = req.query.keyword
        const result = getList(author, keyword)
        return result.then(listData => {
            return new SuccessModel(listData)
        })
    }
    if(method === 'GET' && req.path === '/api/blog/detail'){

        return getDetail(id).then(blog => {
            return new SuccessModel(blog)
        })
    }
    if(method === 'POST' && req.path === '/api/blog/new'){

        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheck
        }

        req.body.author = req.session.username
        return newBlog(req.body).then(val => {
            return new SuccessModel(val)
        })
    }
    if(method === 'POST' && req.path === '/api/blog/update'){

        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheck
        }

        return updateBlog(id, req.body).then(val => {
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel('update err')
            }
        })

    }
    if(method === 'POST' && req.path === '/api/blog/del'){

        const loginCheckResult = loginCheck(req)
        if(loginCheckResult){
            return loginCheck
        }

        const author = req.session.username
        return delBlog(id, author).then(val => {
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel('del err')
            }
        })

    }
}

module.exports = handleBlogRouter;