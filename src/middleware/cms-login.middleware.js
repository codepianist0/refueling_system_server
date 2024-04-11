const {
  USERNAME_OR_PASSWORD_IS_EMPTY,
  USERNAME_OR_PASSWORD_IS_ERROR,
  UNAUTHORIZATION,
} = require("../config/error")
const encryptionPassword = require("../utils/encryption-password")
const { isExist } = require("../service/cms-login.service")
const jwt = require("jsonwebtoken")
const { PUBLICK_KEY } = require("../config/read-key")

// 1. 验证登陆信息
const validateLogin = async (ctx, next) => {
  // 1.1. 验证传入数据是否正确
  const { username, password } = ctx.request.body
  if (!username || !password) {
    ctx.app.emit("error", USERNAME_OR_PASSWORD_IS_EMPTY, ctx)
    return
  }
  // 1.2. 验证用户是否存在 && 密码是否正确
  const res = await isExist(username)
  const userInfo = res[0]
  if (res.length === 0 || userInfo.password !== encryptionPassword(password)) {
    ctx.app.emit("error", USERNAME_OR_PASSWORD_IS_ERROR, ctx)
    return
  }
  // 1.3. 保存用户信息
  ctx.user = userInfo
  await next()
  
}

// 2. 验证token
const validateAuth = async (ctx, next) => {
  // 获取授权
  const authorization = ctx.headers.authorization
  if (!authorization) {
    return ctx.app.emit("error", UNAUTHORIZATION, ctx)
  }
  // 获取token
  const token = authorization.replace("Bearer ", "")
  try {
     const res = jwt.verify(token, PUBLICK_KEY, {
      algorithms: ["RS256"]
    })
    ctx.user = res
    await next()
  } catch(error) {
    ctx.body = {
      code: -1000,
      error: error.message
    }
  }
}

module.exports = {
  validateLogin,
  validateAuth,
}
