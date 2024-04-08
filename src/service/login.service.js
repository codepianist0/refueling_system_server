const connection = require("../app/database")
class LoginService {
  async isExist(username) {
    const statement = "SELECT * from `user` WHERE username = ?;"
    const [result] = await connection.execute(statement, [username])
    return result
  }
}

module.exports = new LoginService()
