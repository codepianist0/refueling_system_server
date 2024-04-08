const { UPLOAD_ERROR } = require("../config/error")
const { saveFile, saveAvatarByUser } = require("../service/file.service")
const { SERVER_HOST, SERVER_PORT } = require("../config/server")
class FileController {
  async create(ctx, next) {
    const { id, username } = ctx.user
    if (!ctx.request.file) {
      return ctx.app.emit("error", UPLOAD_ERROR, ctx)
    }
    // 1. 将图片保存到数据库中
    const fileInfo = ctx.request.file
    const result = await saveFile(fileInfo, id)

    // 2. 将头像的url赋给用户表的avatar字段
    const avatarURL = `${SERVER_HOST}:${SERVER_PORT}/user/avatar/${id}`
    const result2 = await saveAvatarByUser(avatarURL, id)
    ctx.body = {
      code: 0,
      messgae: "头像上传成功",
      data: avatarURL,
    }
  }
}

module.exports = new FileController()
