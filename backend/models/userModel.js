const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../config/db');
const {execute} = require('../utils/queryExecutor');

class User {

  static async create(firstName, lastName, username, email, password) {
    let sql = `
    INSERT INTO user (first_name, last_name, username, e_mail, password)
    VALUES ('${firstName}', '${lastName}', '${username}', '${email}', '${password}')
    `;

    return execute(sql);
  }

  static async update(id, firstName, lastName, username, password) {

  }

  static async delete(id) {
    let sql = `DELETE FROM user WHERE id=${id};`
    return execute(sql);
  }

  static async findAll() {
    let sql = `SELECT id, first_name, last_name, username, e_mail from user;`;
    return execute(sql);
  }

  static async findById(id) {
    let sql = `SELECT id, first_name, last_name, username, e_mail FROM user WHERE id = ${id}`
    return execute(sql);
  }

  static async findByEmail(email) {
    let sql = `SELECT * FROM user WHERE e_mail = '${email}';`
    return execute(sql);
  }

  static generateToken(id) {
    const token = jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "30d"});
    return token;
  }

  static async validatePassword(password, hash) {
    const valid = await bcrypt.compare(password, hash);
    return valid;
  }

}


module.exports = User;