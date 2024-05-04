const KoaRouter = require("@koa/router")
const { validateInfo } = require("../middleware/messagePush.middleware")
const { handleMessagePush } = require("../controller/messagePush.controller")
const { validateAuth } = require("../middleware/login.middleware")
const MessagePushRouter = new KoaRouter({ prefix: "/message" })

MessagePushRouter.post("/", validateInfo, validateAuth, handleMessagePush)

module.exports = MessagePushRouter
