const {
  INCORRECT_INCOMING_DATA,
  USER_ALREADY_EXISTS,
  USERNAME_OR_PASSWORD_IS_EMPTY,
  USERNAME_OR_PASSWORD_IS_ERROR,
  UNAUTHORIZATION,
  UPLOAD_ERROR,
  CAR_IS_EXISTS,
  CAR_IS_NOT_EXISTS,
  ORDER_IS_EMPTY,
  OPERATION_IS_NOT_ALLOWED,
} = require("../config/error")

function errorHandle(app) {
  let code = 0
  let message = ""
  app.on("error", (error, ctx) => {
    switch (error) {
      case INCORRECT_INCOMING_DATA:
        code = -1001
        message = "传入的数据不正确,请检查传入的数据~"
        break
      case USER_ALREADY_EXISTS:
        code = -1002
        message = "用户或邮箱已经存在,请重新创建~"
        break
      case USERNAME_OR_PASSWORD_IS_EMPTY:
        code = -1003
        message = "用户名或密码为空"
        break
      case USERNAME_OR_PASSWORD_IS_ERROR:
        code = -1004
        message = "用户名或密码错误,请重新输入"
        break
      case UNAUTHORIZATION:
        code = -1005
        message = "无效的token或者token已经过期~"
        break
      case UNAUTHORIZATION:
        code = -1005
        message = "无效的token或者token已经过期~"
        break
      case CAR_IS_EXISTS:
        code = -1006
        message = "车牌已经存在,请重新添加"
        break
      case CAR_IS_NOT_EXISTS:
        code = -1007
        message = "车辆不存在,请重新操作"
        break
      case ORDER_IS_EMPTY:
        code = -1008
        message = "订单不存在"
        break
      case UPLOAD_ERROR:
        code = -2001
        message = "图片上传失败"
        break
      case OPERATION_IS_NOT_ALLOWED:
        code = -2002
        message = '没有操作该资源的权限~'
        break
    }
    ctx.body = {
      code,
      message,
    }
  })
}

module.exports = errorHandle
