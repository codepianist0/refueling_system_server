const { INCORRECT_INCOMING_DATA, ORDER_IS_EMPTY } = require("../config/error")
const { getOrderById } = require("../service/order.service")
// 1. 验证传入数据
const validateInfo = async (ctx, next) => {
  const { fuel_volume, fuel_type, cost, fueling_station, position } =
    ctx.request.body
  if (!fuel_volume || !fuel_type || !cost || !fueling_station || !position) {
    ctx.app.emit("error", INCORRECT_INCOMING_DATA, ctx)
    return
  }
  await next()
}
// 2. 验证订单是否存在
const orderIsExist = async (ctx, next) => {
  const { orderId } = ctx.params
  const result = await getOrderById(orderId)
  if (result.length === 0) {
    return ctx.app.emit("error", ORDER_IS_EMPTY, ctx)
  }
  await next()
}


module.exports = {
  validateInfo,
  orderIsExist,
}
