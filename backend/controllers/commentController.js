const asyncHandler = require('express-async-handler');
const {errorHandler} = require('../middleware/errorMiddlewre');
const Comment = require('../models/commentModel');
const Task = require('../models/taskModel');
const Project = require('../models/projectModel');
const UserProject = require('../models/userProjectModel');

const createComment = asyncHandler(async (req, res) => {
  const {text} = req.body;
  if (!text) {
    return errorHandler({err: 'Text cannot be empty', req, res, status: 400});
  }

  const userId = req.user.id;
  const projectId = req.query.id;

  const userExsits = UserProject.findOneUserOfProject(userId, projectId);
  if (userExsits.length == 0) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const createdAt = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const comment = await Comment.create(userId, projectId, text, createdAt);
  if (comment.affectedRows > 0) {
    const response = {
      id: comment.insertId,
      text: text,
      user_id: userId,
      project_id: projectId,
      timestamp: createdAt,
      message: 'Comment created'
    }
    res.status(200).json(response);
  }
  else {
    return errorHandler({err: 'Comment creation failed', req, res, status: 400});
  }
});

const deleteComment = asyncHandler(async (req, res) => {
  const userId = req.user.id;
  const commentId = req.query.id;

  const comment = await Comment.findById(commentId);
  if (comment.length == 0) {
    return errorHandler({err: 'Comment not found', req, res, status: 404});
  }

  if (userId != comment[0].user_id) {
    return errorHandler({err: 'Not authorized', req, res, status: 401});
  }

  const deletedComment = await Comment.delete(commentId);
  if (deletedComment.affectedRows > 0) {
    res.status(200).json({
      id: commentId,
      message: 'Comment deleted'
    })
  }
  else {
    return errorHandler({err: 'Comment deletion failed', req, res, status: 400});
  }
});

const getCommentById = asyncHandler(async (req, res) => {
  const commentId = req.query.id;
  const comment = await Comment.findById(commentId);
  res.status(200).json(comment);
});

module.exports = {
  createComment,
  deleteComment,
  getCommentById
}