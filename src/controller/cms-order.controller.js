const {getOrderList, deleteOrderById, getStatisticsByMonth, getStatisticsByPie} = require("../service/cms-order.service")
class CmsOrderController {
  async getList(ctx, next) {
    const { limit, offset } = ctx.query
    const searchInfo = ctx.request.body
    const result = await getOrderList(Number(limit ?? 10), Number(offset ?? 0), searchInfo)
    ctx.body = {
      code: 0,
      message: "success",
      data: result
    }
  }
  async deleteOrder(ctx, next) {
    const { orderId } = ctx.params
    const res = await deleteOrderById(Number(orderId))
    ctx.body = {
      code: 0,
      message: "success",
      data: res
    }
  }
  async getStatistics(ctx, next) {
    const year = ctx.query.year ?? 2024
    const result = await getStatisticsByMonth(year) 
    ctx.body = {
      code: 0,
      message: "success",
      data: result,
    }
  }
  async getStatistics2(ctx, next) {
    const year = ctx.query.year ?? 2024
    const result = await getStatisticsByPie(year)
    ctx.body = {
      code: 0,
      message: "success",
      data: result,
    }
  }
}

module.exports = new CmsOrderController()
