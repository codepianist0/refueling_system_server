const { KEY } = require("../config/api_key")
const axios = require("axios")
class PositionController {
  async getList(ctx, next) {
    const { latitude, longitude, keyword } = ctx.query
    // 发送网络请求
    const location = `${latitude},${longitude}`
    const url =
      `https://apis.map.qq.com/ws/place/v1/search?` +
      `keyword=${encodeURIComponent(keyword)}&` +
      `boundary=nearby(${location},1000)&` +
      `key=${KEY}`
    const res = await axios.get(url)
    ctx.body = {
      code: 0,
      message: "success",
      data: res.data,
    }
    // https
    //   .get(url, (res) => {
    //     // 修改这里
    //     let dataChunks = []
    //     res.on("data", (chunk) => {
    //       dataChunks.push(chunk)
    //     })
    //     res.on("end", () => {
    //       const dataString = Buffer.concat(dataChunks).toString()
    //       const dataInfo = JSON.parse(dataString)
    //       console.log(dataInfo)
    //       ctx.body = {
    //         code: 0,
    //         message: "success",
    //         data: dataInfo,
    //       }
    //     })
    //   })
    //   .on("error", (error) => {
    //     console.error("Error making HTTPS request:", error)
    //   })
  }
}

module.exports = new PositionController()
