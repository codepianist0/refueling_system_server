const connection = require("../app/database")
class UserService {
  async isExist(username, password) {
    const statement = "SELECT * from `user` WHERE username = ? OR email = ?;"
    const [result] = await connection.execute(statement, [username, password])
    return !!result.length
  }
  async createUser(saveInfo) {
    const statement =
      "INSERT INTO `user` (username, email, password, nickName, phone) VALUES(?, ?, ?, ?, ?);"
    const [result] = await connection.execute(statement, [
      saveInfo.username,
      saveInfo.email,
      saveInfo.password,
      saveInfo.nickName,
      saveInfo.phone,
    ])
    return result
  }
  async getFile(userId) {
    const statement = "SELECT * from file WHERE user_id = ?;"
    const [result] = await connection.execute(statement, [userId])
    return result.pop()
  }
  async getInfo(id) {
    const statement = `SELECT username, email, created_at, nickName, avatar_url, phone FROM \`user\` WHERE id = ?;`
    const [result] = await connection.execute(statement, [id])
    return result
  }
  async changeInfo(id, info) {
    const { username, email, password, phone, nickName, avatar_url } = info
    const statement = `
      UPDATE user
      SET username = COALESCE(?, username),
      email = COALESCE(?, email),
      password = COALESCE(?, password),
      phone = COALESCE(?, phone),
      nickName = COALESCE(?, nickName),
      avatar_url = COALESCE(?, avatar_url)
      WHERE id = ?;
    `
    const [result] = await connection.execute(statement, [
      username || null,
      email || null,
      password || null,
      phone || null,
      nickName || null,
      avatar_url || null,
      id,
    ])
    return result
  }
}

module.exports = new UserService()
