/*
* @Author: Robin
* @Date: 2019-04-14 23:38:34
* @Last Modified by:   robin
* @Last Modified time: 
*/

'use strict';

const xss = require('xss')
const { exec } = require('../db/mysql')

const blog = module.exports

blog.getList = async (author, keyword) => {
    let sql = `select * from blogs where 1=1 `
    if(author){
        sql += `and author='${author}'`
    }
    if(keyword){
        sql += `and title like '%${keyword}'`
    }

    sql += `order by createtime desc`

    return await exec(sql)
}

blog.getDetail = async (id) => {
    let sql = `select * from blogs where id='${id}' `
    const rows = await exec(sql)
    return rows[0]
}

blog.newBlog = async ( blogData = {} ) => {
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const author = blogData.author || 'zhangsan'
    const createTime = Date.now()

    const sql = `
        insert into blogs (title, content, createtime, author)
        values ('${title}', '${content}', ${createTime}, '${author}');
    `
    const insertData = await exec(sql)
    return {
        id: insertData.insertId
    }
    // return exec(sql).then(insertData => {
    //     return {
    //         id: insertData.insertId
    //     }
    // })
}

blog.updateBlog = async (id, blogData = {} ) => {
    const title = xss(blogData.title)
    const content = xss(blogData.content)
    const sql = `update blogs ste title='${title}' and content='${content}' where id=${id}`
    const updateData = await exec(sql)
    if(updateData.affectedRows > 0){
        return true
    }
    return false
    // return exec(sql).then(updateData => {
    //     if(updateData.affectedRows > 0){
    //         return true
    //     }
    //     return false
    // })
}

blog.delBlog = async (id, author) => {
    const sql = `delete form blogs where id='${id}' and author=author='${author}'`
    const delData = await exec(sql)
    if (delData.affectedRows > 0) {
        return true
    }
    return false
    // return exec(sql).then(delData => {
    //     if (delData.affectedRows > 0) {
    //         return true
    //     }
    //     return false
    // })
}