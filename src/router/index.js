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

module.exports = registerRouter