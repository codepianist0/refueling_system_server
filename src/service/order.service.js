const connection = require("../app/database")
const { v4: uuidv4 } = require("uuid")
class OrderService {
  async getOrderListById(id, limit = 10, offset = 0, startTime, endTime) {
    let statement = `SELECT * FROM \`order\` WHERE user_id = ? ORDER BY fueling_date DESC LIMIT ? OFFSET ?;`
    // 如果有传入时间
    if (startTime && endTime) {
      statement = `SELECT * FROM \`order\` WHERE user_id = ? AND fueling_date >= ? AND fueling_date <= ? ORDER BY fueling_date DESC LIMIT ? OFFSET ?;`
      const [result] = await connection.execute(statement, [
        id,
        startTime,
        endTime,
        limit,
        offset,
      ])
      return result
    }

    const [result] = await connection.execute(statement, [id, limit, offset])
    return result
  }
  async createOrder(userId, createInfo) {
    const { car_id, fuel_volume, fuel_type, cost, fueling_station, position } = createInfo
    const number = uuidv4()

    const statement = `
      INSERT INTO \`order\` 
      (user_id, car_id, fuel_volume, fuel_type, cost, fueling_station, position, number) 
      VALUES (?, ?, ?, ?, ?, ?, ?, ?);
    `
    const [result] = await connection.execute(statement, [
      userId,
      car_id,
      fuel_volume,
      fuel_type,
      cost,
      fueling_station,
      position,
      number
    ])
    return result
  }
  async getOrderById(orderId) {
    const statement = `SELECT * FROM \`order\` WHERE id = ?;`
    const [result] = await connection.execute(statement, [orderId])
    return result
  }
  async changeOrder(userId, changeInfo, orderId) {
    const { car_id, fuel_volume, fuel_type, cost, fueling_station, position } =
      changeInfo
    const statement = `
      UPDATE \`order\` 
      SET user_id = COALESCE(?, user_id), car_id = COALESCE(?, car_id), fuel_volume = COALESCE(?, fuel_volume), 
      fuel_type = COALESCE(?, fuel_type), cost = COALESCE(?,cost), fueling_station = COALESCE(?, fueling_station), 
      position = COALESCE(?, position)
      WHERE id = ?
    `
    const [result] = await connection.execute(statement, [
      userId,
      car_id || null,
      fuel_volume || null,
      fuel_type || null,
      cost || null,
      fueling_station || null,
      position || null,
      orderId,
    ])
    return result
  }
  async deleteOrder(orderId) {
    const statement = `DELETE FROM \`order\` WHERE id = ?;`
    const [result] = await connection.execute(statement, [orderId])
    return result
  }
  // 1. 按年统计
  async getStatisticsByYear(id) {
    const statement = `
      SELECT YEAR(fueling_date) AS year, SUM(fuel_volume) AS totle_of_volume, COUNT(*) AS count_of_orders, SUM(cost) AS totol_of_cost
      FROM \`order\`
      WHERE user_id = ?
      GROUP BY YEAR(fueling_date)
      ORDER BY year;
    `
    const [result] = await connection.execute(statement, [id])
    return result
  }
  // 2. 按月统计
  async getStatisticsByMonth(id, year) {
    const statement = `
      SELECT MONTH(fueling_date) AS month, SUM(fuel_volume) AS totle_of_volume, SUM(cost) AS totol_of_cost, COUNT(*) AS count_of_orders
      FROM \`order\`
      WHERE user_id = ? AND YEAR(fueling_date) = ?
      GROUP BY MONTH(fueling_date)
      ORDER BY MONTH;
    `
    const [result] = await connection.execute(statement, [id, year])
    return result
  }
  async getAllInfoById(id) {
    const statement = `
      SELECT COUNT(*) as \`count\`, SUM(cost) as cost
      FROM \`order\`
      WHERE user_id = ?
      GROUP BY user_id;
    `
    const [ result ] = await connection.execute(statement, [id])
    return result
  }
}

module.exports = new OrderService()
