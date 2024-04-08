const fs = require("fs")
const {
  createUser,
  getFile,
  getInfo,
  changeInfo,
} = require("../service/user.service")
const { UPLOAD_PATH } = require("../config/path")

class UserController {
  async create(ctx, next) {
    // 获取到用户传递过来的数据
    const saveInfo = ctx.request.body
    // 保存到数据库
    const result = await createUser(saveInfo)
    
    ctx.body = {
      code: 0,
      message: "创建用户成功~",
      data: result,
    }
  }
  // 获取用户头像
  async showAvatarImage(ctx, next) {
    // 1. 获取用户id
    const { userId } = ctx.params
    // 2. 通过用户id查询图片
    const result = await getFile(userId)
    const { filename, mimetype } = result
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }
  // 获取用户信息
  async getUserInfo(ctx, next) {
    const { id } = ctx.user
    const result = await getInfo(id)
    ctx.body = {
      code: 0,
      message: "success",
      data: result,
    }
  }
  async changeUserInfo(ctx, next) {
    const { id } = ctx.user
    const info = ctx.request.body
    const result = await changeInfo(id, info)
    ctx.body = {
      code: 0,
      message: "success",
      data: result,
    }
  }
}

module.exports = new UserController()
