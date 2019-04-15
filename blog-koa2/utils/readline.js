/*
* @Author: Robin
* @Date: 2019-04-15 00:57:43
* @Last Modified by:   robin
* @Last Modified time: 
*/

'use strict';

const fs = require('fs')
const path = require('path')
const readline = require('readline')

const filename = path.join(__dirname, '../', '../', 'logs', 'access.log')
const readStream = fs.createReadStream(filename)

const rl = readline.createInterface({
    input: readStream
})

let chromeNum = 0
let sum = 0

rl.on('line', (lineData) => {
    if(!lineData){
        return
    }

    sum ++

    const arr =lineData.split(' -- ')
    if(arr[2] && arr[2].indexOf('Chrome') >0 ){
        chromeNum ++
    }
})

rl.on('close', ()=>{
    console.log('chrome 占比: ' + chromeNum/sum)
})