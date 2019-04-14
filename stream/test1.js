/*
* @Author: Robin
* @Date: 2019-04-15 03:14:23
* @Last Modified by:   robin
* @Last Modified time: 
*/

'use strict';

// process.stdin.pipe(process.stdout)
const { createReadStream, createWriteStream } = require('fs')

const { resolve } = require('path')

const f1 = resolve(__dirname, 'data.txt')
const f2 = resolve(__dirname, 'data-bak.txt')

require('http').createServer((req, res)=>{
    if(req.method === 'POST'){
        createReadStream(f1).pipe(res)
    }
}).listen(3000)