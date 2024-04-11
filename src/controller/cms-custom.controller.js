const { getList, disableInfo } = require("../service/cms-custom.service")
class CmsCustomController {
  async getCostomList(ctx, next) {
    const { limit, offset } = ctx.query
    const searchInfo = ctx.request.body
    const res = await getList(Number(limit ?? 10), Number(offset ?? 0), searchInfo)
    ctx.body = {
      code: 0,
      message: "success",
      data: res
    }
  }
  async disableUser(ctx, next) {
    const { userId } = ctx.params
    const res = await disableInfo(userId)
    ctx.body = {
      code: 0,
      message: "success",
      data: res
    }
  }
}

module.exports = new CmsCustomController()
