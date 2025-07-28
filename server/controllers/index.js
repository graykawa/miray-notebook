// 数据库相关操作
const mysql = require('mysql2/promise')
const config = require('../config/index.js')

// 创建线程池 （连接池）
const pool = mysql.createPool({
  host: config.db.host,
  port: config.db.port,
  user: config.db.user,
  password: config.db.password,
  database: config.db.database
})

// 执行 sql 的方法
const allServices = {
  async query(sql, values) {
    try {
      // 通过连接池连接mysql
      const conn = await pool.getConnection()
      // 执行各种增删改查的 sql 语句
      const [rows, fields] = await conn.query(sql, values)
      // 释放连接
      pool.releaseConnection(conn);
      // 返回查询结果
      return Promise.resolve(rows)
    } catch (error) {
      return Promise.reject(error)
    }
  }
}

// 登录要执行函数
const userLogin = (username, password) => {
  let _sql = `select * from user where username='${username}' and password='${password}';`
  return allServices.query(_sql)
}

//根据username查询账号是否存在
const userFindByUsername = (username) => {
  let _sql = `select * from user where username='${username}';`
  return allServices.query(_sql)
}

// 注册要执行函数
const userRegister = (username, password, nickname) => {
  createTime = new Date().toLocaleString()
  let _sql = `insert into user (username, password, nickname,create_time) values ('${username}', '${password}', '${nickname}','${createTime}');`
  return allServices.query(_sql)
}


module.exports = {
  userLogin,
  userFindByUsername,
  userRegister
}

