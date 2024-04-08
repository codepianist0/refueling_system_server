const KoaRouter = require("@koa/router")
const { validateAuth } = require("../middleware/login.middleware")
const { validateInfo, orderIsExist } = require("../middleware/order.middleware")
const {
  getList,
  create,
  change,
  deleteOrder,
  getStatistics1,
  getStatistics2,
  getAllInfo
} = require("../controller/order.controller")
const { varifyPermission } = require("../middleware/permission.middleware")

const orderRouter = new KoaRouter({ prefix: "/order" })

// 1.1 查询订单列表
orderRouter.get("/", validateAuth, getList)
// 1.2 通过年查询统计结果
orderRouter.get("/year", validateAuth, getStatistics1)
// 1.3 通过月查询统计结果
orderRouter.get("/month", validateAuth, getStatistics2)
// 1.4 查询总的加油数据
orderRouter.get("/all", validateAuth, getAllInfo)
// 增加订单
orderRouter.post("/", validateAuth, validateInfo, create)
// 修改订单
orderRouter.patch(
  "/:orderId",
  validateAuth,
  orderIsExist,
  varifyPermission,
  change
)
// 删除订单
orderRouter.delete(
  "/:orderId",
  validateAuth,
  orderIsExist,
  varifyPermission,
  deleteOrder
)

module.exports = orderRouter
