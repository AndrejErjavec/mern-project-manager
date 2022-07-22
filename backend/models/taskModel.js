const db = require('../config/db');
const {execute} = require('../utils/queryExecutor');

class Task {
  static async create(name, createdAt, startDate, dueDate, status, priority, projectId) {
    let sql = `INSERT INTO task (name, date_created, start_date, due_date, status, priority, project_id)
    VALUES ('${name}', ${createdAt}, '${startDate}', '${dueDate}', '${status}', '${priority}', '${projectId}');`

    return execute(sql);
  }

  static async update(id, name, startDate, dueDate, status, priority) {
    let sql = `UPDATE task SET name = ${name}, start_date = ${startDate}, due_date = ${dueDate}?, status = ${status}, priority = ${priority}
    WHERE id = ${id};`

    return execute(sql);
  }

  static async delete(id) {
    let sql = `DELETE FROM task WHERE id = ${id};`
    return execute(sql);
  }

  static async getTaskById(id) {
    let sql = `SELECT * from task WHERE id = ${id};`
    return execute(sql);
  }

  static async getSubtasks(id) {
    let sql = `SELECT * from subtask WHERE task_id = ${id};`
    return execute(sql);
  }

  static async getComments(id) {
    let sql = `SELECT * from comment WHERE task_id = ${id};`
    return execute(sql);
  }

}

module.exports = Task;