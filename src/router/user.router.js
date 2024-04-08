const KoaRouter = require("@koa/router")
const {
  validateUser,
  handlePassword
} = require("../middleware/user.middleware")
const { create, showAvatarImage, getUserInfo, changeUserInfo } = require("../controller/user.controller")
const { validateAuth } = require("../middleware/login.middleware")
 
const userRouter = new KoaRouter({ prefix: "/user" })

// 1. 创建用户
userRouter.post("/", validateUser, handlePassword, create)
// 2. 修改用户信息
userRouter.post("/change", validateAuth, changeUserInfo)
// 3. 获取用户信息
userRouter.get("/", validateAuth, getUserInfo)
userRouter.get("/avatar/:userId", showAvatarImage)

module.exports = userRouter
