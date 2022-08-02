const {execute} = require('../utils/queryExecutor');

class Project {
  static async create(name, description, createdAt, manager) {
    let sql = `INSERT INTO project (name, description, date_created, manager_id)
    VALUES ('${name}', '${description}', '${createdAt}', '${manager}');
    `;

    // Weird stuff here...had to insert manager id with created project id into user_project table after creating a project.
    const result = await execute(sql);
    const id = result.insertId;

    let sql2 = `INSERT INTO user_project (user_id, project_id) VALUES (${manager}, ${id});`;
    await execute(sql2);
    return result;
  }

  static async update(id, name, description) {
    let sql = `UPDATE project
    SET name='${name}', description='${description}'
    WHERE id=${id};`

    return execute(sql);
  }

  static async delete(id) {
    let sql = `DELETE FROM project WHERE id=${id};`
    return execute(sql);
  }

  static async findById(id) {
    let sql = `SELECT * FROM project WHERE id=${id};`
    return execute(sql);
  }

  static async findAll() {
    let sql = `SELECT * FROM project;`
    return execute(sql);
  }

  static async getTasks(id) {
    let sql = `SELECT * FROM task WHERE project_id=${id};`
    return execute(sql);
  }

  static async getComments(id) {
    let sql = `SELECT * from comment WHERE project_id = ${id};`
    return execute(sql);
  }

}

module.exports = Project;