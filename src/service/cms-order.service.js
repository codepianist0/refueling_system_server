
const connection = require("../app/database")
const { processDataGeneric } = require("../utils/echarData-handle")
class CmsOrderService {

  async getOrderList(limit = 10, offset = 0, searchInfo) {
    // 初始化基本查询语句和条件数组
    let statement = `
      SELECT o.id id, o.cost, u.\`nickName\`, u.username, 
             o.position, o.fueling_date, o.\`status\`, o.fueling_station,
             o.fuel_type, o.fuel_volume, u.phone
      FROM \`order\` o
      LEFT JOIN \`user\` u ON o.user_id = u.id
      WHERE 1=1
    `;
    
    // 参数数组
    const params = [];
    
    // 动态添加查询条件
    if (searchInfo.username) {
      statement += " AND u.username LIKE ?";
      params.push(`%${searchInfo.username}%`);
    }
    if (searchInfo.nickName) {
      statement += " AND u.nickName LIKE ?";
      params.push(`%${searchInfo.nickName}%`);
    }
    if (searchInfo.phone) {
      statement += " AND u.phone LIKE ?";
      params.push(`%${searchInfo.phone}%`);
    }
    if (searchInfo.status) {
      statement += " AND o.\`status\` LIKE ?";
      params.push(`%${searchInfo.status}%`);
    }
    if (searchInfo.startTime && searchInfo.endTime) {
      statement += " AND o.fueling_date BETWEEN ? AND ?";
      params.push(searchInfo.startTime, searchInfo.endTime);
    }
    statement += ` ORDER BY o.fueling_date DESC LIMIT ${limit} OFFSET ${offset} `;

    // 1. 执行查询获取订单列表
    const [orderList] = await connection.execute(statement, params);
    // 2. 查询订单条数
    const countStatement = `SELECT COUNT(*) AS count FROM \`order\` o LEFT JOIN \`user\` u ON o.user_id = u.id;`;
    const [counter] = await connection.execute(countStatement);
    
    return {
      orderList,
      count: counter[0].count
    };
  }
  // 删除订单
  async deleteOrderById(orderId) {
    const statement = `DELETE FROM \`order\` WHERE id = ?;`
    const [ result ] = await connection.execute(statement, [orderId])
    return result
  }

  async getStatisticsByMonth(year) {
    const statement = `
      SELECT MONTH(fueling_date) AS month, SUM(fuel_volume) AS totle_of_volume, SUM(cost) AS totol_of_cost, COUNT(*) AS count_of_orders
      FROM \`order\`
      WHERE YEAR(fueling_date) = ?
      GROUP BY MONTH(fueling_date)
      ORDER BY MONTH;
    `
    const [result] = await connection.execute(statement, [year])
    const data = processDataGeneric(result)
    return data
  }
  async getStatisticsByPie(year) {
    const statement = `
      SELECT COUNT(*) count, SUM(fuel_volume) fuel_volume, SUM(cost) cost, fuel_type type FROM \`order\`
      GROUP BY fuel_type;
    `
    const [result] = await connection.execute(statement, [year])
    // const data = processDataGeneric(result)
    return result
  }

}

module.exports = new CmsOrderService()
