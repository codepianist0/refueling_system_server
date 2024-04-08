const {
  INCORRECT_INCOMING_DATA,
  CAR_IS_EXISTS,
  CAR_IS_NOT_EXISTS,
} = require("../config/error")
const { isExist, queryCarByCarId } = require("../service/car.service")
// 1. 验证传入数据是否合理
const validateInfo = async (ctx, next) => {
  const { name, license_plate, tank_size, brand } = ctx.request.body
  if (!name || !license_plate || !tank_size || !brand) {
    ctx.app.emit("error", INCORRECT_INCOMING_DATA, ctx)
    return
  }
  // 检查该车辆是否已经添加
  const result = await isExist(license_plate)
  if (result) {
    ctx.app.emit("error", CAR_IS_EXISTS, ctx)
    return
  }
  await next()
}
// 2. 车辆是否存在
const validateCarIsExist = async (ctx, next) => {
  const { carId } = ctx.params
  const result = await queryCarByCarId(carId)
  if (result.length === 0) {
    ctx.app.emit("error", CAR_IS_NOT_EXISTS, ctx)
    return
  }
  await next()
}

module.exports = {
  validateInfo,
  validateCarIsExist,
}
