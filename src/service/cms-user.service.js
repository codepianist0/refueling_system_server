
const connection = require("../app/database")

class CmsUserService {
  async isExist(username) {
    const statement = "SELECT * from `user_cms` WHERE username = ?;"
    const [ result ] = await connection.execute(statement, [username])
    return !!result.length
  }

  async createUser(username, password, role) {
    const statement = "INSERT INTO user_cms (username, password, role) VALUES(?, ?, ?) "
    const [result] = await connection.execute(statement, [username, password, role])
    return result
  }
  async getUserInfoById(id) {
    const statement = `SELECT * from user_cms WHERE id = ?;`
    const [result] = await connection.execute(statement, [id])
    return result
  }
}

module.exports = new CmsUserService()
