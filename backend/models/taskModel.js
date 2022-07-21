const db = require('../config/db')

class Task {
  static async create(name, createdAt, startDate, dueDate, status, priority, projectId) {
    let sql = `INSERT INTO task (name, date_created, start_date, due_date, status, priority, project_id)
    VALUES ('${name}', ${createdAt}, '${startDate}', '${dueDate}', '${status}', '${priority}', '${projectId}');`

    return new Promise((resolve, reject) => {
      db.query(sql, (err, result) => {
        if (err) {
          return reject(err);
        }
        return resolve(result);
      });
    });
  }

  static async update() {

  }

  static async delete() {

  }

  static async getTaskById() {
    
  }

}