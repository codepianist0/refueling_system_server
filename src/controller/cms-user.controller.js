const { createUser, getUserInfoById } = require("../service/cms-user.service")
class CmsUserController {
  async create(ctx, next) {
    const { username, password, role } = ctx.request.body
    const res = await createUser(username, password, role)
    ctx.body = {
      code: 0,
      message: "success",
      date: res
    }
  }
  async getUserInfo(ctx, next) {
    const { id } = ctx.user
    const res = await getUserInfoById(id)
    ctx.body = {
      code: 0,
      message: "success",
      data: res
    }
  }
  
}

module.exports = new CmsUserController()
