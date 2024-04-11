const KoaRouter = require("@koa/router")
const { validateAuth } = require("../middleware/login.middleware")
const { getList, deleteOrder, getStatistics, getStatistics2 } = require("../controller/cms-order.controller")
const CmsOrderRouter = new KoaRouter({ prefix: "/cmsOrder" })

// 获取订单列表
CmsOrderRouter.post("/", validateAuth, getList)
// 删除订单
CmsOrderRouter.patch("/:orderId", validateAuth, deleteOrder)


// 通过月查询统计结果
CmsOrderRouter.get("/year", validateAuth, getStatistics)
// 获取饼状图数据
CmsOrderRouter.get("/pie", validateAuth, getStatistics2)


// 查询总的加油数据
module.exports = CmsOrderRouter
