const fs = require("fs")

// 自动化注册路由
function registerRouter(app) {
  const routerList = fs.readdirSync(__dirname)
  routerList.forEach(item => {
    if(item.endsWith(".router.js")) {
      const router = require(`./${item}`)
      app.use(router.routes())
      app.use(router.allowedMethods())
    }
  })
}
// const loginRouter =require("../router/login.router")
// app.use(loginRouter.routes())
// app.use(loginRouter.allowedMethods())
// const useRouter = require("../router/user.router")
// app.use(useRouter.routes())
// app.use(useRouter.allowedMethods())


module.exports = registerRouter