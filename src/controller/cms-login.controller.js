const jwt = require("jsonwebtoken")
const { PRIVATE_KEY } = require("../config/read-key")
class CmsLoginController {
  async createToken(ctx, next) {
    const { id, username } = ctx.user
    const token = jwt.sign({id, username}, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256"
    })
    // 将token返回给客户端
    ctx.body = {
      code: 0,
      message: "success",
      data: {
        id,
        username,
        token
      }
    }
  }
  async test(ctx, next) {
    ctx.body = {
      code: 0,
      message: "success",
      data: ctx.user
    }
  }
}

module.exports = new CmsLoginController()
