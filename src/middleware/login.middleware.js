const jwt = require("jsonwebtoken")
const { isExist } = require("../service/login.service")
const encryptionPassword = require("../utils/encryption-password")
const { PUBLICK_KEY } = require("../config/read-key")
const {
  USERNAME_OR_PASSWORD_IS_EMPTY,
  USERNAME_OR_PASSWORD_IS_ERROR,
  UNAUTHORIZATION,
} = require("../config/error")
// 1. 验证信息
const validateLogin = async (ctx, next) => {
  const { username, password } = ctx.request.body
  // 1.1 验证传入数据的正确性
  if (!username || !password) {
    ctx.app.emit("error", USERNAME_OR_PASSWORD_IS_EMPTY, ctx)
    return
  }
  // 1.2 查询用户是否存在 || 密码是否正确
  const result = await isExist(username)
  const userInfo = result[0]
  if (!userInfo || userInfo.password !== encryptionPassword(password)) {
    ctx.app.emit("error", USERNAME_OR_PASSWORD_IS_ERROR, ctx)
    return
  }
  // 1.3 保存用户信息
  ctx.user = userInfo
  await next()
}

// 2. 验证token
const validateAuth = async (ctx, next) => {
  // 2.1 获取token
  const authorization = ctx.headers.authorization
  if (!authorization) {
    return ctx.app.emit('error', UNAUTHORIZATION, ctx)
  }
  const token = authorization.replace("Bearer ", "")
  // 2.2 验证token是否有效
  try {
    const res = jwt.verify(token, PUBLICK_KEY, { algorithms: ["RS256"] })
    ctx.user = res
    await next()
  } catch (error) {
    ctx.body = {
      code: -1000,
      error: error.message
    }
    return
  }
}

module.exports = {
  validateLogin,
  validateAuth,
}
