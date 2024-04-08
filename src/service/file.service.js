const connection = require("../app/database")
class FileService {
  async saveFile(fileInfo, user_id) {
    const statement =
      "INSERT INTO file (filename, mimetype, size, user_id) VALUES(?, ?, ?, ?);"
    const [result] = await connection.execute(statement, [
      fileInfo.filename,
      fileInfo.mimetype,
      fileInfo.size,
      user_id,
    ])
    return result
  }
  async saveAvatarByUser(avatarURL, id) {
    const statement = "UPDATE `user` SET avatar_url = ? WHERE id = ?;"
    const [result] = await connection.execute(statement, [avatarURL, id])
    return result
  }
}

module.exports = new FileService()
