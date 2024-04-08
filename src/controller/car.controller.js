const fs = require("fs")
const { UPLOAD_ERROR } = require("../config/error")
const {
  create,
  getList,
  changeInfo,
  deleteInfo,
  getCommon,
  getFile,
  saveFile,
  saveAvatarByCar,
} = require("../service/car.service")
const { SERVER_HOST, SERVER_PORT } = require("../config/server")
const { UPLOAD_PATH } = require("../config/path")

class CarController {
  async create(ctx, next) {
    const user_id = ctx.user.id
    const { name, license_plate, tank_size, brand, fuel_type } =
      ctx.request.body
    const result = await create(
      name,
      license_plate,
      tank_size,
      brand,
      user_id,
      fuel_type
    )
    ctx.body = {
      code: 0,
      message: "添加成功~",
      data: result,
    }
  }
  async createImg(ctx, next) {
    const { carId } = ctx.params
    if (!ctx.request.file) {
      return ctx.app.emit("error", UPLOAD_ERROR)
    }
    // 1. 将图片保存到数据库中
    const fileInfo = ctx.request.file
    const result = await saveFile(carId, fileInfo)
    // 2. 将图片url赋给car表的img字段
    const avatarURL = `${SERVER_HOST}:${SERVER_PORT}/car/avatar/${carId}`
    const result2 = await saveAvatarByCar(carId, avatarURL)
    ctx.body = {
      code: 0,
      messgae: "success",
      data: result2,
    }
  }
  async getList(ctx, next) {
    const user_id = ctx.user.id
    const result = await getList(user_id)
    ctx.body = {
      code: 0,
      message: "success~",
      data: result,
    }
  }
  async getCommonUse(ctx, next) {
    const user_id = ctx.user.id
    const { carId } = ctx.params
    const result = await getCommon(user_id, carId)
    ctx.body = {
      code: 0,
      message: "success",
      data: result,
    }
  }
  async changeInfo(ctx, next) {
    // 获取要修改车辆的id
    const { carId } = ctx.params
    const { name, license_plate, tank_size, brand } = ctx.request.body
    const result = await changeInfo(
      name,
      license_plate,
      tank_size,
      brand,
      carId
    )
    ctx.body = {
      code: 0,
      message: "success",
      data: result,
    }
  }
  async deleteInfo(ctx, next) {
    const { carId } = ctx.params
    const result = await deleteInfo(carId)
    ctx.body = {
      code: 0,
      message: "seccess",
      data: result,
    }
  }
  async showAvatarImage(ctx, next) {
    // 1. 获取车辆id
    const { carId } = ctx.params
    // 2. 通过车辆id去查询图片信息
    const result = await getFile(carId)
    // 3. 读取图片
    const { filename, mimetype } = result
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }
}

module.exports = new CarController()
