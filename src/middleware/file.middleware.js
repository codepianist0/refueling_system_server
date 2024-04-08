const multer = require("@koa/multer")
const { UPLOAD_PATH } = require("../config/path.js")

const uploadAvatar = multer({ dest: UPLOAD_PATH })

// 单张上传
const handleAvatar = uploadAvatar.single("avatar")
// 上传多张
const handlePhotos = uploadAvatar.array("photos")

module.exports = {
  handleAvatar,
  handlePhotos
}
