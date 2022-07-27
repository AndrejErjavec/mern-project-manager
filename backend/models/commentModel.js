const {execute} = require('../utils/queryExecutor');

class Comment {
  static async create(userId, taskId, text, createdAt) {
    let sql = `INSERT INTO comment (user_id, task_id, text, timestamp)
    VALUES ('${userId}', '${taskId}', '${text}', '${createdAt}');`

    return execute(sql);
  }

  static async delete(id) {
    let sql = `DELETE FROM comment WHERE id = '${id}';`
    return execute(sql);
  }

  static async findById(id) {
    let sql = `SELECT * FROM comment WHERE id = '${id}';`
    return execute(sql);
  }
}

module.exports = Comment;