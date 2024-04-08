const KoaRouter = require("@koa/router")
const { validateAuth } = require("../middleware/login.middleware")
const { handleAvatar } = require("../middleware/file.middleware")
const { create } = require("../controller/file.controller")

const fileRouter = new KoaRouter({ prefix: "/file" })

fileRouter.post("/", validateAuth, handleAvatar, create)

module.exports = fileRouter
