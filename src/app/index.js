const Koa = require("koa")
const bodyParser = require("koa-bodyparser")
const errorHandle = require("../utils/error-handle")
const registerRouter = require("../router")
const cors = require("@koa/cors")


const app = new Koa()
app.use(cors({
  origin: 'http://127.0.0.1:5173' // 只允许来自这个源的请求
}));
app.use(bodyParser())

// const userRouter = require("../router/user-router")
// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods())
// const loginRouter = require("../router/login-router")
// app.use(loginRouter.routes())
// app.use(loginRouter.allowedMethods())
registerRouter(app) // 自动注册路由
errorHandle(app) // 错误处理


module.exports = app
