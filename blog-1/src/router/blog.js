const { SuccessModel, ErrorModel } = require('../model/resModel');

const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')

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
        return newBlog(req.body).then(val => {
            return new SuccessModel(val)
        })
    }
    if(method === 'POST' && req.path === '/api/blog/update'){
        return updateBlog(id, req.body).then(val => {
            if(val){
                return new SuccessModel()
            }else{
                return new ErrorModel('update err')
            }
        })

    }
    if(method === 'POST' && req.path === '/api/blog/del'){
        const author = 'zhangsan'
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