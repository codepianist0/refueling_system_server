const KoaRouter = require("@koa/router")
const FeedbackRouter = new KoaRouter({ prefix: "/feedback" })

// 创建反馈
FeedbackRouter.post("/", )

module.exports = FeedbackRouter
