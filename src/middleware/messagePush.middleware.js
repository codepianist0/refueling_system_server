const { INCORRECT_INCOMING_DATA  } = require("../config/error")
const validateInfo = async (ctx, next) => {
  // 验证信息
  const { templateId, code } = ctx.query
  if(!templateId || !code) {
    return ctx.app.emit("error", INCORRECT_INCOMING_DATA, ctx)
  }
  await next()
}

module.exports = {
  validateInfo
}