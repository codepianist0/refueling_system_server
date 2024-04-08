const encryptionPassword = require("../utils/encryption-password.js")
const {
  INCORRECT_INCOMING_DATA,
  USER_ALREADY_EXISTS,
} = require("../config/error.js")
const { isExist } = require("../service/user.service.js")

// 验证数据
const validateUser = async (ctx, next) => {
  const { username, password, email } = ctx.request.body
  // 1 判断是否为空
  if (!username || !email || !password) {
    ctx.app.emit("error", INCORRECT_INCOMING_DATA, ctx)
    return
  }
  // 2 判断是否已经存在
  const result = await isExist(username, password)
  if (result) {
    ctx.app.emit("error", USER_ALREADY_EXISTS, ctx)
    return
  }
  await next()
}

// 2. 加密密码
const handlePassword = async (ctx, next) => {
  // 获取密码
  const { password } = ctx.request.body
  const newPassword = encryptionPassword(password)
  ctx.request.body.password = newPassword
  await next()
}

module.exports = {
  validateUser,
  handlePassword,
}
