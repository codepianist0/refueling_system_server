const crypto = require("crypto")

/**
 * 将密码进行加密处理
 * @param {*} password 需要处理的密码
 * @returns 加密后的密码
 */
function encryptionPassword(password) {
  const md5 = crypto.createHash("md5")
  const md5pwd = md5.update(password).digest("hex")
  return md5pwd
}

module.exports = encryptionPassword
