const mysql = require("mysql2")

// 1. 创建连接池
const connectionPool = mysql.createPool({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "8219@Chen",
  database: "refueling_system_db",
  connectionLimit: 10
})

// 2. 判断是否连接成功
connectionPool.getConnection((err, connection) => {
  if (err) {
    console.log("连接失败", err)
    return
  }
  connection.connect((err) => {
    if(err) {
      console.log("与数据库交互失败");
      return
    }
    console.log("连接成功, 与数据库交互成功");
  })
})

module.exports = connectionPool.promise()
