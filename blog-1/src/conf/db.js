const env = process.env.NODE_ENV  // 环境参数

// 配置
let MYSQL_CONF
let REDIS_CONF

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
        host: '47.93.97.5',
        password: 'Pi3.14159'
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
        host: '47.93.97.5',
        password: 'Pi3.14159'
    }
}

module.exports = {
    MYSQL_CONF,
    REDIS_CONF
}