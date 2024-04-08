const jwt = require("jsonwebtoken")
const { PRIVATE_KEY } = require("../config/read-key")
class LoginController {
  // 颁发token
  async createToken(ctx, next) {
    // 1 获取用户信息
    const { username, id } = ctx.user
    const token = jwt.sign({ id, username }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256",
    })
    // 2 将token返回给客户端
    ctx.body = {
      code: 0,
      message: "登陆成功",
      data: {
        id,
        username,
        token,
      },
    }
  }
  // test
  async test(ctx, next) {
    ctx.body = `${ctx.user.username}验证成功`
  }
}

module.exports = new LoginController()
