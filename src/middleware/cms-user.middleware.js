const {
  INCORRECT_INCOMING_DATA,
  USER_ALREADY_EXISTS,
} = require("../config/error")
const { isExist } = require("../service/cms-user.service")
const encryptionPassword = require("../utils/encryption-password")

const validateInfo = async (ctx, next) => {
  const { username, password, role } = ctx.request.body
  // 1. 判断是否为空
  if (!username || !password || !role) {
    ctx.app.emit("error", INCORRECT_INCOMING_DATA, ctx)
    return
  }
  // 2. 判断是否存在
  const res = await isExist(username)
  if (res) {
    ctx.app.emit("error", USER_ALREADY_EXISTS, ctx)
    return
  }
  await next()
}

const handlePassword = async (ctx, next) => {
  // 3.对密码进行加密
  const { password } = ctx.request.body
  const newPassword = encryptionPassword(password)
  ctx.request.body.password = newPassword
  await next()
}

module.exports = {
  validateInfo,
  handlePassword,
}
