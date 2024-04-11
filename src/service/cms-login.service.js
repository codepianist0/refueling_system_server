
const connection = require("../app/database")

class CmsLoginService {
  async isExist(username) {
    const statement = "SELECT * from `user_cms` WHERE username = ?;"
    const [result] = await connection.execute(statement, [username])
    return result
  }
  async 
}

module.exports = new CmsLoginService()
