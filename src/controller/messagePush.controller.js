const axios = require("axios")
const { queryCarByCarId } = require("../service/car.service")
const { APP_ID, SECRET } = process.env
class MessagePushController {
  async handleMessagePush(ctx, next) {
    // 拿到数据
    const { templateId, code } = ctx.query
    const accessToken = await getAccessToken()
    // const { session_key, openid } = await getOpenId(code)
    await getOpenId(code)

    // 订单信息
    const orderInfo = ctx.request.body
    // 获取车辆信息
    const carInfo = await queryCarByCarId(orderInfo.car_id)
    // 推送的信息
    const postData = {
      touser: openid,
      template_id: templateId,
      page: "index",
      data: {
        amount3: {
          value: orderInfo.cost
        },
        name4: {
          value: "羽鸽"
        },
        time5: {
          value: new Date().toISOString().slice(0, 10)
        },
        car_number17: {
          value: carInfo[0].license_plate
        },
        phrase10: {
          value: orderInfo.status
        }
         
      },
    }
    const res = await axios.post(
      `https://api.weixin.qq.com/cgi-bin/message/subscribe/send?access_token=${accessToken}`,
      JSON.stringify(postData)
    )
    console.log(res.data)
    if (res.data.errcode === 0) {
      ctx.body = {
        code: 0,
        message: "消息推送成功",
      }
    }
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
let openid = null
async function getOpenId(code) {
  const url = `https://api.weixin.qq.com/sns/jscode2session?appid=${APP_ID}&secret=${SECRET}&js_code=${code}&grant_type=authorization_code`
  const res = await axios.get(url)
  if (res.data.openid) {
    openid = res.data.openid
    // return res.data
  }
}

module.exports = new MessagePushController()
