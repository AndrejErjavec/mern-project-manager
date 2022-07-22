const db = require('../config/db');
const {execute} = require('../utils/queryExecutor');

class Subtask {
  static async create(name, startDate, dueDate, status, priority, complete, taskId) {
    let sql = `INSERT INTO subtask (name, start_date, due_date, status, priority, complete, task_id) 
    VALUES('${name}', '${startDate}', '${dueDate}', '${status}', '${priority}', '${complete}', ${taskId},);`

    return execute(sql);
  }

  static async update(id, name, startDate, dueDate, status, priority, complete) {
    let sql = `UPDATE subtask
    SET name=${name}, start_date=${startDate}, due_date=${dueDate}, status=${status}, pririty=${priority}, complete=${complete}
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