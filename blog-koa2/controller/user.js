/*
* @Author: Robin
* @Date: 2019-04-14 23:38:34
* @Last Modified by:   robin
* @Last Modified time: 
*/

'use strict';

const { exec, escape } = require('../db/mysql')
const { genPassword } = require('../utils/cryp')

const user = module.exports

user.login = async (username, password) => {
    username = escape(username)
    // password = genPassword(password)
    password = escape(password)

    const sql = `
        select username, realname from users where username=${username} and password=${password}
    `
    const rows = await exec(sql)
    return rows[0]
    // return exec(sql).then(rows => {
    //     return rows[0] || {}
    // })

}