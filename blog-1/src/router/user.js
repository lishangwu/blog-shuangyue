const { SuccessModel, ErrorModel } = require('../model/resModel');

const {
    logincheck
} = require('../controller/user')

const handleUserRouter = (req, res)=>{
    const method = req.method

    if(method === 'POST' && req.path === '/api/user/login'){
        const { username, password } = req.body
        return logincheck(username, password).then(data => {
            if(data.username){
                return new SuccessModel('login ok')
            }else{
                return new ErrorModel('login err')
            }
        })

    }
}

module.exports = handleUserRouter;