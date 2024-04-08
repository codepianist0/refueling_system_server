const axios = require("axios")
const { APP_ID, SECRET } = process.env
class MessagePushController {
  async handleMessagePush(ctx, next) {
    // 拿到数据
    const { templateId, code } = ctx.query
    const accessToken = await getAccessToken()
    const { session_key, openid } = await getOpenId(code)
    const postData = {
      touser: openid,
      template_id: templateId,
      page: "index",
      data: {
        date2: {
          value: "2024-12-12",
        },
        thing3: {
          value: "15天前",
        },
      },
    }
    const res = await axios.post(
      `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${accessToken}`,
      JSON.stringify(postData)
    )
    console.log(res.data)
  }
}

// 获取accessToken
async function getAccessToken() {
  const url = `https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${APP_ID}&secret=${SECRET}`
  const res = await axios.get(url)
  if (res || res.data) {
    return res.data.access_token
  }
}
// 获取openId
async function getOpenId(code) {
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`
  const res = await axios.get(url)
  if (res.data.openid) {
    return res.data
  }
}

module.exports = new MessagePushController()
