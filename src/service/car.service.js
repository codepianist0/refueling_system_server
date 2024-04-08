const connection = require("../app/database")
class CarService {
  async isExist(license_plate) {
    const statement = `SELECT * FROM car WHERE license_plate = ?;`
    const [result] = await connection.execute(statement, [license_plate])
    return !!result.length
  }
  async create(name, license_plate, tank_size, brand, user_id, fuel_type) {
    const statement =
      "INSERT INTO car (name, license_plate, tank_size, brand, user_id, fuel_type) VALUES(?, ?, ?, ?, ?, ?);"
    const [result] = await connection.execute(statement, [
      name,
      license_plate,
      tank_size,
      brand,
      user_id,
      fuel_type
    ])
    return result
  }
  async saveFile(carId, fileInfo) {
    const statement = `INSERT INTO car_img (filename, mimetype, size, car_id) VALUES(?, ?, ?, ?);`
    const [ result ] = await connection.execute(statement, [
      fileInfo.filename,
      fileInfo.mimetype,
      fileInfo.size,
      carId
    ])
    return result
  }
  async getList(user_id) {
    const statement = "SELECT * FROM car WHERE user_id = ?;"
    const [result] = await connection.execute(statement, [user_id])
    return result
  }
  async getCommon(userId, carId) {
    const statement = "SELECT * FROM car WHERE user_id = ? AND common_use = ?;"
    const [ result ] = await connection.execute(statement, [userId, carId])
    return result.pop()
  }
  async changeInfo(name, license_plate, tank_size, brand, carId) {
    const statement = `
      UPDATE car SET 
      name = COALESCE(?, name), license_plate = COALESCE(?, license_plate), tank_size = COALESCE(?, tank_size), brand = COALESCE(?, brand) 
      WHERE car_id = ?;
    `
    const [result] = await connection.execute(statement, [
      name || null,
      license_plate || null,
      tank_size || null,
      brand || null,
      carId,
    ])
    return result
  }
  async queryCarByCarId(carId) {
    const statement = "SELECT * FROM car WHERE car_id = ?;"
    const [result] = await connection.execute(statement, [carId])
    return result
  }
  async deleteInfo(carId) {
    const statement = "DELETE FROM car WHERE car_id = ?;"
    const [result] = await connection.execute(statement, [carId])
    return result
  }
  async getFile(carId) {
    const statement = "SELECT * from car_img WHERE car_id = ?;"
    const [ result ] = await connection.execute(statement, [carId])
    return result.pop()
  }
  async saveAvatarByCar(carId, avatarURL) {
    const statement = "UPDATE car SET car_img = ? WHERE car_id = ?;"
    const [ result ] = await connection.execute(statement, [avatarURL, carId])
    return result
  }
}

module.exports = new CarService()
