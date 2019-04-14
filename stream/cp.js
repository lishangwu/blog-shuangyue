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

const read = createReadStream(f1)
const write = createWriteStream(f2)

read.pipe(write)
read.on('data', (chunk)=>{
    console.log('read :', chunk.toString())
})
read.on('end', ()=>{
    console.log('read end')
})