/*
* @Author: Robin
* @Date: 2019-04-14 23:31:45
* @Last Modified by:   robin
* @Last Modified time: 
*/

'use strict';

class BaseModel{
    constructor(data, message){
        if(typeof data === 'string'){
            this.message = data
            data = null
            message = null
        }
        if(data){
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}

class SuccessModel extends BaseModel{
    constructor(data, message){
        super(data, message)
        this.erron = 0
    }
}


class ErrorModel extends BaseModel{
    constructor(data, message){
        super(data, message)
        this.erron = -1
    }
}

module.exports = {SuccessModel, ErrorModel}