const {execute} = require('../utils/queryExecutor');

class UserProject {
  static async add(userId, projectId) {
    let sql = `INSERT INTO user_project (user_id, project_id) VALUES (${userId}, ${projectId});`;
    return execute(sql);
  }

  static async delete(userId, projectId) {
    let sql = `DELETE FROM user_project WHERE user_id=${userId} AND project_id=${projectId};`;
    return execute(sql);
  }

  static async findAllUsersOfProject(projectId) {
    let sql = `SELECT id, first_name, last_name, username, e_mail
    FROM user, (  
       SELECT user_id AS uid
       FROM user_project 
       WHERE project_id=${projectId}
    ) AS result
    WHERE id=uid;`;

   return execute(sql);
  }

  static findUsersNotInProject(projectId) {
    let sql = `SELECT id, first_name, last_name, username, e_mail
    FROM user
    WHERE id NOT IN (
      SELECT user_id
      FROM user_project
      WHERE project_id=${projectId}
    );`

    return execute(sql);
  }

  // used to determine whether a user is member of a project
  static async findOneUserOfProject(userId, projectId) {
    let sql = `SELECT user_id FROM user_project WHERE project_id=${projectId} AND user_id=${userId};`
    return execute(sql);
  }

  static async findAllProjectsOfUser(userId) {
    let sql = `SELECT *
    FROM project, (  
       SELECT project_id AS pid
       FROM user_project 
       WHERE user_id=${userId}
    ) AS result
    WHERE id=pid;`

   return execute(sql);
  }
}

module.exports = UserProject;