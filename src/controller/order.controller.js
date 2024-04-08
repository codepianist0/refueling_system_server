const {
  getOrderListById,
  createOrder,
  changeOrder,
  deleteOrder,
  getStatisticsByYear,
  getStatisticsByMonth,
  getAllInfoById
} = require("../service/order.service")
class OrderController {
  async getList(ctx, next) {
    const { id, username } = ctx.user
    const { limit, offset, startTime, endTime } = ctx.query
    // 获取列表
    const result = await getOrderListById(id, limit, offset, startTime, endTime)
    ctx.body = {
      code: 0,
      message: "success",
      data: result,
    }
  }
  async getStatistics1(ctx, next) {
    const { id } = ctx.user
    const result = await getStatisticsByYear(id)
    ctx.body = {
      code: 0,
      message: "success",
      data: result,
    }
  }
  async getStatistics2(ctx, next) {
    const { id } = ctx.user
    const { year } = ctx.query
    const result = await getStatisticsByMonth(id, year)
    ctx.body = {
      code: 0,
      message: "success",
      data: result,
    }
  }
  async create(ctx, next) {
    const { id, username } = ctx.user
    const createInfo = ctx.request.body
    const result = await createOrder(id, createInfo)
    ctx.body = {
      code: 0,
      message: "success",
      data: result,
    }
  }
  async change(ctx, next) {
    const { id } = ctx.user
    const { orderId } = ctx.params
    const changeInfo = ctx.request.body
    const result = await changeOrder(id, changeInfo, orderId)
    ctx.body = {
      code: 0,
      message: "success",
      data: result,
    }
  }
  async deleteOrder(ctx, next) {
    const { orderId } = ctx.params
    const result = await deleteOrder(orderId)
    ctx.body = {
      code: 0,
      message: "success",
      data: result,
    }
  }
  async getAllInfo(ctx, next) {
    const { id } = ctx.user
    const result = await getAllInfoById(id)
    ctx.body = {
      code: 0,
      message: "success",
      data: result
    }

  }
}

module.exports = new OrderController()
