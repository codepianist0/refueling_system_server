const KoaRouter = require("@koa/router")
const { validateInfo } = require("../middleware/position.middleware")
const { getList } = require("../controller/position.controller")

const PositionRouter = new KoaRouter({ prefix: "/position" })

PositionRouter.get("/", validateInfo, getList)

module.exports = PositionRouter
