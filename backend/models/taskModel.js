const db = require('../config/db');
const {execute} = require('../utils/queryExecutor');

class Task {
  static async create(name, description, createdAt, dueDate, priority, completed, projectId) {
    let sql = `INSERT INTO task (name, description, date_created, due_date, priority, completed, project_id)
    VALUES ('${name}', '${description}', '${createdAt}', '${dueDate}', '${priority}', ${completed}, '${projectId}');`

    return execute(sql);
  }

  static async update(id, name, dueDate, description, priority, completed) {
    let sql = `UPDATE task SET name='${name}', due_date='${dueDate}', description='${description}', priority='${priority}', completed=${completed}
    WHERE id=${id};`

    return execute(sql);
  }

  static async delete(id) {
    let sql = `DELETE FROM task WHERE id = ${id};`
    return execute(sql);
  }

  static async findById(id) {
    let sql = `SELECT * from task WHERE id = ${id};`
    return execute(sql);
  }

  static async getSubtasks(id) {
    let sql = `SELECT * from subtask WHERE task_id = ${id};`
    return execute(sql);
  }

  static findOneUserOfTask(userId, taskId) {
    let sql = `SELECT * FROM user_task WHERE user_id=${userId} AND task_id = ${taskId};`
    return execute(sql);
  }

}

module.exports = Task;