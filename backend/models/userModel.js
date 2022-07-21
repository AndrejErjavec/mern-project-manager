const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');
const db = require('../config/db');

class User {

  static async create(firstName, lastName, username, email, password) {
    let sql = `
    INSERT INTO user (first_name, last_name, username, e_mail, password)
    VALUES ('${firstName}', '${lastName}', '${username}', '${email}', '${password}')
    `;

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      })
    })
  }

  static async findAll() {
    let sql = `SELECT * from user;`;
    
    return new Promise ((resolve, reject) => {
      db.execute(sql, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  }

  static async findById(id) {
    let sql = `SELECT * FROM user WHERE id = ${id}`
    
    return new Promise ((resolve, reject) => {
      db.execute(sql, (error, result) => {
        if (error) return reject(error);
        return resolve(result);
      });
    });
  }

  static async findByEmail(email) {
    let sql = `SELECT * FROM user WHERE e_mail = '${email}';`
    
    return new Promise ((resolve, reject) => {
      db.execute(sql, (error, result) => {
        if (error) return reject(error);
        return resolve(result[0]);
      });
    });
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