/*
* @Author: Robin
* @Date: 2019-04-15 00:57:43
* @Last Modified by:   robin
* @Last Modified time: 
*/

'use strict';


const fs = require('fs')
const path = require('path')

// 写日志
function writeLog(writeStream, log) {
    writeStream.write(log + '\n')  // 关键代码
}

// 生成 write Stream
function createWriteStream(fileName) {
    // const date = new Date()
    // fileName = (date.getFullYear() +'-'+ date.getMonth() +'-'+ date.getDay() + '-' + date.getMinutes() + '-') + fileName
    const fullFileName = path.join(__dirname, '../', '../', 'logs', fileName)
    const writeStream = fs.createWriteStream(fullFileName, {
        flags: 'a'
    })
    return writeStream
}

// 写访问日志
const accessWriteStream = createWriteStream('access.log')
function access(log) {
    writeLog(accessWriteStream, log)
}

module.exports = {
    access
}