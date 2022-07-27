const db = require('../config/db');
const {execute} = require('../utils/queryExecutor');

class Subtask {
  static async create(name, createdAt, priority, completed, taskId) {
    let sql = `INSERT INTO subtask (name, date_created, priority, completed, task_id) 
    VALUES('${name}', '${createdAt}', '${priority}', ${completed}, ${taskId});`

    return execute(sql);
  }

  static async update(id, name, priority, completed) {
    let sql = `UPDATE subtask
    SET name='${name}', priority='${priority}', completed=${completed}
    WHERE id = ${id};`
    
    return execute(sql);
  }

  static async delete(id) {
    let sql = `DELETE FROM subtask WHERE id = ${id};`
    return execute(sql);
  }

  static async findById(id) {
    let sql = `SELECT * FROM subtask WHERE id = ${id};`
    return execute(sql);
  }

}

module.exports = Subtask