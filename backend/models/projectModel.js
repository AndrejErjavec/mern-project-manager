const db = require('../config/db')

class Project {
  static async create(name, description, createdAt, dueDate, status, manager) {
    let sql = `INSERT INTO project (name, description, date_created, due_date, status, manager_id)
    VALUES ('${name}', '${description}', '${createdAt}', '${dueDate}', '${status}', '${manager}');
    `;

    return new Promise((resolve, reject) => {
      db.execute(sql, (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      });
    });
  }

  static async update(id, name, description, dueDate, status) {
    let sql = `UPDATE project
    SET name='${name}', description='${description}', due_date=${dueDate}, status='${status}'
    WHERE id=${id};`

    return new Promise((resolve, reject) => {
      db.execute(sql, (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      });
    });
  }

  static async delete(id) {
    let sql = `DELETE FROM project WHERE id = ${id};`

    return new Promise((resolve, reject) => {
      db.execute(sql, (err, result) => {
        if (err) {
          return reject(err)
        }
        return resolve(result)
      });
    });
  }

  static async getProjectById(id) {
    
  }

}