const db = require('../config/db')

const execute = (sql) => {
  return new Promise((resolve, reject) => {
    db.execute(sql, (err, result) => {
      if (err) {
        return reject(err)
      }
      return resolve(result)
    });
  });
}

module.exports = {execute};