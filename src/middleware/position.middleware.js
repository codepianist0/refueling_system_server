const { INCORRECT_INCOMING_DATA } = require("../config/error")
const validateInfo = async (ctx, next) => {
  const { latitude, longitude, keyword } = ctx.query
  if ((!latitude || !longitude, !keyword)) {
    return ctx.app.emit("error", INCORRECT_INCOMING_DATA, ctx)
  }
  await next()
}

module.exports = {
  validateInfo,
}
