const Koa = require("koa")
const bodyParser = require("koa-bodyparser")
const errorHandle = require("../utils/error-handle")
const registerRouter = require("../router")

const app = new Koa()

// 跨域
app.use(async (ctx, next) => {
  ctx.set("Access-Control-Allow-Origin", "*");
  ctx.set(
    "Access-Control-Allow-Headers",
    "Authorization, Content-Type, Accept, Accept-Encoding, Connection, Host, Origin"
  );
  ctx.set("Access-Control-Allow-Credentials", "true"); 
  ctx.set(
    "Access-Control-Allow-Methods",
    "PUT, POST, GET, DELETE, PATCH, OPTIONS"
  );

  if (ctx.method === "OPTIONS") {
    ctx.status = 204; 
  } else {
    await next();
  }
});


app.use(bodyParser())

// const loginRouter = require("../router/login.router")
// app.use(loginRouter.routes())
// app.use(loginRouter.allowedMethods())
// const userRouter = require("../router/user.router")
// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods())
registerRouter(app) // 自动注册路由

errorHandle(app) // 错误处理

module.exports = app
