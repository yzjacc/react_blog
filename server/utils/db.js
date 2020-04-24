const mysql = require('mysql')
// 连接数据库, 创建数据连接池
const pool = mysql.createPool({
  host: '127.0.0.1', // 数据库地址
  port: 3306, // 端口号 默认为3306
  user: 'root', // 数据库用户名
  password: 'Yu20191123', // 数据库密码
  database: 'my_blog' // 数据库名
})

let query = function (sql, values) {
  return new Promise(( resolve, reject ) => {
    pool.getConnection((err, connection) => {
      if (err) {
        reject(err)
      } else {
        connection.query(sql, values, (err, data) => {
          if ( err ) {
            reject(err)
          } else {
            resolve(data)
          }
          // 释放数据库连接
          connection.release()
        })
      }
    })
  })
}

module.exports = { query }
