const env = process.env.NODE_ENV  // 环境参数

// 配置
let MYSQL_CONF
let REDIS_CONF

const REDIS_CONF_host = '***'

const REDIS_CONF_password = '***'

if (env === 'dev') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        port: '3306',
        database: 'myblog'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: REDIS_CONF_host,
        password: REDIS_CONF_password
    }
}

if (env === 'production') {
    // mysql
    MYSQL_CONF = {
        host: 'localhost',
        user: 'root',
        password: 'rootroot',
        port: '3306',
        database: 'myblog'
    }

    // redis
    REDIS_CONF = {
        port: 6379,
        host: REDIS_CONF_host,
        password: REDIS_CONF_password
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}