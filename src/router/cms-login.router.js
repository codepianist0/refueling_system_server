const KoaRouter = require("@koa/router")
const { validateLogin, validateAuth } = require("../middleware/cms-login.middleware")
const { createToken, test } = require("../controller/cms-login.controller")

const CmsLoginRouter = new KoaRouter({ prefix: "/cmsLogin" })


CmsLoginRouter.post("/", validateLogin, createToken)
// 测试token
CmsLoginRouter.get("/", validateAuth, test)

module.exports = CmsLoginRouter
