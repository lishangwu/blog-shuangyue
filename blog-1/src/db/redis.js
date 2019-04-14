/*
* @Author: Robin
* @Date: 2019-04-15 00:18:41
* @Last Modified by:   robin
* @Last Modified time: 
*/

'use strict';

const redis = require('redis')
const { REDIS_CONF } = require('../conf/db.js')

const redisClient = redis.createClient(REDIS_CONF.port, REDIS_CONF.host, {password: REDIS_CONF.password})

redisClient.on('error', err => {
    console.log(err)
})

function set(key, val) {
    if(typeof val === 'object'){
        val = JSON.stringify(val)
    }
    redisClient.set(key, val, redis.print)
}

function get(key) {
    return new Promise((resolve, reject) => {
        redisClient.get(key, (err, val) => {
            if(err){
                reject(err)
                return
            }
            if(val == null){
                resolve(null)
                return
            }
            
            try {
                resolve(JSON.parse(val))
            }catch (e) {
                resolve(val)
            }
        })
    })
}

module.exports = {
    set, get
}