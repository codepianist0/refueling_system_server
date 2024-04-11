const connection = require("../app/database")
class CmsCustomService {
  // async getList(limit = 10, offset = 0, searchInfo) {
  //   const statement = `SELECT id, username, email, created_at, nickName, avatar_url, phone from \`user\`
  //   WHERE username = ？ && email = ? && nickName = ? && phone = ? && created_at >= ？ && created_at <= ？
  //   ORDER BY created_at DESC
  //   LIMIT ${limit} OFFSET ${offset};`
  //   const [result] = await connection.execute(statement, [
  //     searchInfo.username,
  //     searchInfo.email,
  //     searchInfo.nickName,
  //     searchInfo.phone,
  //     searchInfo.startTime,
  //     searchInfo.endTime,
  //   ])
  //   return result
  // }
  async getList(limit = 10, offset = 0, searchInfo) {
    // 基础查询，不包含过滤条件
    let statement = `SELECT id, username, email, created_at, status, nickName, avatar_url, phone FROM \`user\``

    // 存储查询条件的数组
    const conditions = []
    // 存储对应条件值的数组
    const params = []

    // 根据searchInfo动态添加查询条件
    if (searchInfo.username) {
      conditions.push("username LIKE ?")
      params.push(`%${searchInfo.username}%`)
    }
    if (searchInfo.email) {
      conditions.push("email LIKE ?")
      params.push(`%${searchInfo.email}%`)
    }
    if (searchInfo.nickName) {
      conditions.push("nickName LIKE ?")
      params.push(`%${searchInfo.nickName}%`)
    }
    if (searchInfo.phone) {
      conditions.push("phone LIKE ?")
      params.push(`%${searchInfo.phone}%`)
    }
    if (searchInfo.status) {
      conditions.push("status LIKE ?")
      params.push(`%${searchInfo.status}%`)
    }
    if (searchInfo.startTime) {
      conditions.push("created_at >= ?")
      params.push(searchInfo.startTime)
    }
    if (searchInfo.endTime) {
      conditions.push("created_at <= ?")
      params.push(searchInfo.endTime)
    }

    // 如果有过滤条件，将它们添加到查询语句中
    if (conditions.length) {
      statement += " WHERE " + conditions.join(" AND ")
    }

    // 添加排序和分页
    statement += ` ORDER BY created_at DESC LIMIT ${limit} OFFSET ${offset}`
    // 执行查询
    const [result] = await connection.execute(statement, params)

    const statement2 = `SELECT COUNT(*) count from \`user\`;`
    const [result2] = await connection.execute(statement2)
    return {
      userList: result,
      count: result2[0].count,
    }
  }
  async disableInfo(userId) {
    const statement = `UPDATE  \`user\` SET \`status\` = "禁用" WHERE id = ?`
    const [result] = await connection.execute(statement, [userId])
    return result
  }
}

module.exports = new CmsCustomService()
