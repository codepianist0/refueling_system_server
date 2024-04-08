const KoaRouter = require("@koa/router")
const {
  validateLogin,
  validateAuth,
} = require("../middleware/login.middleware")
const { createToken, test } = require("../controller/login.controller")

const loginRouter = new KoaRouter({ prefix: "/login" })

// 登陆
loginRouter.post("/", validateLogin, createToken)
loginRouter.get("/test", validateAuth, test)

module.exports = loginRouter
