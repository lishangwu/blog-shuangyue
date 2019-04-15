var express = require('express');
var router = express.Router();

const { SuccessModel, ErrorModel } = require('../model/resModel');
const {
    login
} = require('../controller/user')



/* GET users listing. */
router.get('/login', function(req, res, next) {
    const { username, password } = req.query
    const result = login(username, password)
    return result.then(data => {
        if (data.username) {
            // 设置 session
            req.session.username = data.username
            req.session.realname = data.realname

            res.json(
                new SuccessModel('login ok')
            )
            return
        }
        res.json(
            new ErrorModel('登录失败')
        )
    })
});

router.get('/login-test', function(req, res, next) {
    if(req.session.username){
        res.json(new SuccessModel('already login'))
    }else{
        res.json(new ErrorModel('need login'))
    }
});

module.exports = router;
