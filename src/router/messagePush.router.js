const KoaRouter = require("@koa/router")
const { validateInfo } = require("../middleware/messagePush.middleware")
const { handleMessagePush } = require("../controller/messagePush.controller")
const MessagePushRouter = new KoaRouter({ prefix: "/message" })


MessagePushRouter.get("/", validateInfo, handleMessagePush)

module.exports = MessagePushRouter
