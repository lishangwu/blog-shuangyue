/*
* @Author: Robin
* @Date: 2019-04-15 04:38:24
* @Last Modified by:   robin
* @Last Modified time: 
*/

'use strict';

const { ErrorModel } = require('../model/resModel')

module.exports = async (ctx, next) => {
    if(ctx.session.username){
        await next()
        return
    }
    ctx.body = (new ErrorModel('need login ..'))
}