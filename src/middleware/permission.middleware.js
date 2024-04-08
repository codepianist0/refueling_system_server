const { OPERATION_IS_NOT_ALLOWED } = require("../config/error")
const { checkResouce } = require("../service/permission.service")
// 验证是否有权限修改信息
const varifyPermission = async (ctx, next) => {
  // 1. 获取用户id
  const { id } = ctx.user
  // 2. 获取参数
  const paramsInfo = ctx.params
  const keyName = Object.keys(paramsInfo)[0]
  const resourceId = ctx.params[keyName]
  // 获取表名
  const resourceName = keyName.replace("Id", "")
  // 如果没有权限
  const isPermission = await checkResouce(id, resourceId, resourceName)
  if (!!!isPermission.length) {
    return ctx.app.emit('error', OPERATION_IS_NOT_ALLOWED, ctx)
  }
  await next()
}

module.exports = {
  varifyPermission,
}
