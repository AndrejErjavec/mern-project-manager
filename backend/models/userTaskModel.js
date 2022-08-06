const {execute} = require('../utils/queryExecutor');

class UserTask {
  static async add(userId, taskId) {
    let sql = `INSERT INTO user_task (user_id, task_id) VALUES (${userId}, ${taskId});`
    return execute(sql);
  }

  static async remove(userId, taskId) {
    let sql = `DELETE FROM user_task WHERE user_id=${userId} AND task_id=${taskId};`
    return execute(sql);
  }

  static async findAllUsersOfTask(taskId) {
    let sql = `SELECT id, first_name, last_name, username, e_mail
    FROM user, (  
       SELECT user_id AS uid
       FROM user_task
       WHERE task_id=${taskId}
    ) AS result
    WHERE id=uid;`;
    
    return execute(sql);
  }

  static findUsersNotInTask(taskId) {
    let sql = `SELECT id, first_name, last_name, username, e_mail
    FROM user
    WHERE id IN (
      SELECT user_id 
      FROM user_project 
      WHERE project_id IN ( 
        SELECT project_id 
        FROM task 
        WHERE id=${taskId} 
      ) 
      AND user_id NOT IN (
	      SELECT user_id
        FROM user_task
        WHERE task_id=${taskId}
      )
    );`

    return execute(sql);
  }

  static async findOneUserOfTask(userId, projectId) {
    let sql = `SELECT user_id FROM user_project WHERE project_id=${projectId} AND user_id=${userId};`
    return execute(sql);
  }

  static async findAllTasksOfUser(userId) {
    let sql = `SELECT *
    FROM task, (  
       SELECT task_id AS tid
       FROM user_task
       WHERE user_id=${userId}
    ) AS result
    WHERE id=tid;`

   return execute(sql);
  }

  static async findAllTasksOfUserInProject(userId, projectId) {
    let sql = `SELECT *
    FROM task, (  
       SELECT task_id AS tid
       FROM user_task
       WHERE user_id=${userId}
    ) AS result
    WHERE id=tid AND project_id=${projectId};`

    return execute(sql);
  }
}

module.exports = UserTask;