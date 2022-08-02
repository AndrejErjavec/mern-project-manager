const {execute} = require('../utils/queryExecutor');

class Comment {
  static async create(userId, projectId, text, createdAt) {
    let sql = `INSERT INTO comment (user_id, project_id, text, timestamp)
    VALUES ('${userId}', '${projectId}', '${text}', '${createdAt}');`

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