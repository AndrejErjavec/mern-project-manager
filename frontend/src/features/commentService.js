import axios from '../config/axios';

const COMMENT_URL = '/api/comment/';

const createComment = async (text, projectId) => {
  const response = await axios.post(COMMENT_URL + `create?id=${projectId}`, text);
  return response.data;
}

const commentService = {
  createComment
}

export default commentService;