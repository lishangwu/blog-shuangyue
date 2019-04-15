var express = require('express');
var router = express.Router();

const { SuccessModel, ErrorModel } = require('../model/resModel');

const {
    getList,
    getDetail,
    newBlog,
    updateBlog,
    delBlog
} = require('../controller/blog')

const loginCheck = require('../middleware/loginCheck')

/* GET users listing. */
router.get('/list', loginCheck, function(req, res, next) {
    const author = req.query.author
    const keyword = req.query.keyword
    const result = getList(author, keyword)
    return result.then(listData => {
        res.json(new SuccessModel(listData))
    })
});

router.get('/detail', function(req, res, next) {
    return getDetail(id).then(blog => {
        res.json(new SuccessModel(blog))
    })
});
router.post('/new', loginCheck, function(req, res, next) {
    console.log('/new........')

    req.body.author = req.session.username
    return newBlog(req.body).then(val => {
        res.json( new SuccessModel(val) )
    })
});
router.post('/update', loginCheck,  function(req, res, next) {
    req.body.author = req.session.username
    return updateBlog(id, req.body).then(val => {
        if(val){
            res.json(new SuccessModel())
        }else{
            res.json(new ErrorModel('update err'))
        }
    })
});
router.post('/del', loginCheck, function(req, res, next) {
    const author = req.session.username
    return delBlog(id, author).then(val => {
        if(val){
            res.json(new SuccessModel())
        }else{
            res.json(new ErrorModel('del err'))
        }
    })
});


module.exports = router;
