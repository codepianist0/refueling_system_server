const connection = require("../app/database")
class PermissionService {
  async checkResouce(userId, resourceId, resourceName) {
    // 命名错误，特殊处理
    if (resourceName === "car") {
      const statement = `SELECT * FROM \`${resourceName}\` WHERE user_id = ? AND car_id = ?;`
      const [result] = await connection.execute(statement, [userId, resourceId])
      return result
    }
    const statement = `SELECT * FROM \`${resourceName}\` WHERE user_id = ? AND id = ?;`
    const [result] = await connection.execute(statement, [userId, resourceId])
    return result
  }
}

module.exports = new PermissionService()
