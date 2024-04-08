const fs = require("fs")
const path = require("path")

// 读取公钥和私钥
const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/privateKey.pem"))
const PUBLICK_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/publicKey.pem"))

module.exports = {
  PRIVATE_KEY,
  PUBLICK_KEY
}