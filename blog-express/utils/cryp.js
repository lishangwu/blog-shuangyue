/*
* @Author: Robin
* @Date: 2019-04-15 00:57:43
* @Last Modified by:   robin
* @Last Modified time: 
*/

'use strict';

const crypto = require('crypto')

const SECRET_KEY = 'sbsbsbsb'

function md5(content) {
    return crypto.createHash('md5').update(content).digest('hex')
}

function genPassword(password) {
    return md5(`password=${password}&key=${SECRET_KEY}`)
}

module.exports = {
    genPassword
}