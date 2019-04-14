const { SuccessModel, ErrorModel } = require('../model/resModel');
const { set } = require('../db/redis')

const {
    login
} = require('../controller/user')



const handleUserRouter = (req, res)=>{
    const method = req.method

    if(method === 'POST' && req.path === '/api/user/login'){
        const { username, password } = req.body
        return login(username, password).then(data => {
            if(data.username){

                req.session.username = data.username
                req.session.realname = data.realname

                set(req.sessionId, req.session)

                return new SuccessModel('login ok')
            }else{
                return new ErrorModel('login err')
            }
        })

    }
    // if(method === 'GET' && req.path === '/api/user/login-test'){
    //     if(req.session.username){
    //         return Promise.resolve(new SuccessModel('already login'))
    //     }else{
    //         return Promise.resolve(new SuccessModel('need login'))
    //
    //     }
    //
    // }
}

module.exports = handleUserRouter;