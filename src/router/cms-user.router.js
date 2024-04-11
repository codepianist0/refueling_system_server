const KoaRouter = require("@koa/router")
const { validateInfo, handlePassword } = require("../middleware/cms-user.middleware")
const { validateAuth } = require("../middleware/cms-login.middleware")
const { create, getUserInfo } = require("../controller/cms-user.controller")
const CmsUserRouter = new KoaRouter({ prefix: "/cmsUser" })

// 创建用户
CmsUserRouter.post("/", validateInfo, handlePassword, create)
// 获取用户详细信息
CmsUserRouter.get("/", validateAuth, getUserInfo)



module.exports = CmsUserRouter
