const KoaRouter = require("@koa/router")
const { validateAuth } = require("../middleware/login.middleware")
const { getCostomList, disableUser } = require("../controller/cms-custom.controller")

const CmsCustomRouter = new KoaRouter({ prefix: "/cmsCustom" })

// 获取客户列表
CmsCustomRouter.post("/", validateAuth, getCostomList)
// 禁用用户
CmsCustomRouter.patch("/:userId", validateAuth, disableUser)


module.exports = CmsCustomRouter
