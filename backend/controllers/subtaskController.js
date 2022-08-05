const asyncHandler = require('express-async-handler');
const {errorHandler} = require('../middleware/errorMiddlewre');
const Task = require('../models/taskModel');
const Project = require('../models/projectModel');
const UserProject = require('../models/userProjectModel');
const Subtask = require('../models/subtaskModel');

const createSubtask = asyncHandler(async (req, res) => {
  const {name, priority, completed} = req.body;

  if (!name || !priority || completed === undefined) {
    return errorHandler({err: 'Please fill all fields',  req, res, status: 401})
  }

  const taskId = req.query.id;
  const userId = req.user.id;

  const task = await Task.findById(taskId);
  if (task.length == 0) {
    return errorHandler({err: 'Task does not exsit',  req, res, status: 404});
  }

  const project = await Project.findById(task[0].project_id);
  const user = await UserProject.findOneUserOfProject(userId, project[0].id);
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const subTask = await Subtask.create(name, createdAt, priority, completed, taskId);

  if (subTask.affectedRows > 0) {
    res.status(201).json({
      id: subTask.insertId,
      task_id: taskId,
      name: name,
      priority: priority,
      completed: completed,
      cretedAt: createdAt,
      message: 'Subtask created'
    });
  }
  else {
    return errorHandler({err: 'Subtask creation failed', req, res, status: 400});
  }
});

const updateSubtask = asyncHandler(async (req, res) => {
  const subtaskId = req.query.id;
  const {name, priority, completed} = req.body;
  const userId = req.user.id;

  if (!name || !priority) {
    return errorHandler({err: 'Please fill all fields',  req, res, status: 401});
  }

  const subTask = await Subtask.findById(subtaskId);
  if (subTask.length == 0) {
    return errorHandler({err: 'Subtask not found', req, res, status: 404});
  }

  const task = await Task.findById(subTask[0].task_id);
  const project = await Project.findById(task[0].project_id);


  const user = await UserProject.findOneUserOfProject(userId, project[0].id);
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const update = await Subtask.update(subtaskId, name, priority, completed);
  const updatedSubtask = await Subtask.findById(subtaskId);

  if (update.affectedRows > 0) {
    res.status(200).json({
      subtask: updatedSubtask[0],
      message: 'Subtask updated successfully'
    });
  }
  else {
    return errorHandler({err: 'Subtask update failed', req, res, status: 400});
  }
});

const deleteSubtask = asyncHandler(async (req, res) => {
  const subtaskId = req.query.id;
  const userId = req.user.id;

  const subTask = await Subtask.findById(subtaskId);
  if (subTask.length == 0) {
    return errorHandler({err: 'Subtask not found', req, res, status: 404});
  }

  const task = await Task.findById(subTask[0].task_id);
  const project = await Project.findById(task[0].project_id);

  const user = await UserProject.findOneUserOfProject(userId, project[0].id);
  if (user.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const updatedSubtask = await Subtask.delete(subtaskId);

  if (updatedSubtask.affectedRows > 0) {
    res.status(200).json({
      id: subtaskId,
      message: 'Subtask deleted successfully'
    });
  }
  else {
    return errorHandler({err: 'Subtask deletion failed', req, res, status: 400});
  }
});

const getSubtaskById = asyncHandler(async (req, res) => {
  const subtaskId = req.query.id;
  const subtask = await Subtask.findById(subtaskId);
  res.status(200).json(subtask);
});


module.exports = {
  createSubtask,
  updateSubtask,
  deleteSubtask,
  getSubtaskById
};