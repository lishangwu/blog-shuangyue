/*
* @Author: Robin
* @Date: 2019-04-15 04:38:24
* @Last Modified by:   robin
* @Last Modified time: 
*/

'use strict';

const { ErrorModel } = require('../model/resModel')

module.exports = (req, res, next) => {
    if(req.session.username){
        next()
        return
    }
    res.json(new ErrorModel('need login ..'))
}