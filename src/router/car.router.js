const KoaRouter = require("@koa/router")
const { validateInfo,validateCarIsExist } = require("../middleware/car.middleware")
const { validateAuth } = require("../middleware/login.middleware")
const {
  create,
  createImg,
  getList,
  changeInfo,
  deleteInfo,
  getCommonUse,
  showAvatarImage
} = require("../controller/car.controller")
const { varifyPermission } = require("../middleware/permission.middleware")
const { handleAvatar } = require("../middleware/file.middleware")


const carRouter = new KoaRouter({ prefix: "/car" })

// 1. 新增
// 1.1 新增车辆
carRouter.post("/", validateAuth, validateInfo, create)
// 1.2 新增车辆图片
carRouter.post("/:carId", validateAuth, handleAvatar, createImg)
// 2. 查询
// 2.1 查询车辆列表
carRouter.get("/", validateAuth, getList)
// 2.2 查询常用车辆
carRouter.get("/:carId", validateAuth, getCommonUse)
// 2.3 查询车辆图片
carRouter.get("/avatar/:carId", showAvatarImage)
// 3. 改
carRouter.patch("/:carId", validateAuth, varifyPermission, changeInfo)
// 4. 删除
carRouter.delete("/:carId", validateAuth, validateCarIsExist, varifyPermission, deleteInfo)

module.exports = carRouter
