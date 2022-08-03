import { useState, useEffect, useContext } from "react";
import UserContext from '../context/store/UserStore';
import CommentContext from '../context/store/CommentStore';
import ProjectContext from '../context/store/ProjectStore';
import projectService from '../features/projectService';
import commentService from '../features/commentService';
import {toast} from "react-toastify";
import CommentItem from './CommentItem';
import '../css/ProjectList.css';

const CommentList = () => {
  const {user} = useContext(UserContext);
  const {selected} = useContext(ProjectContext);
  const {comments, dispatch} = useContext(CommentContext);

  const [formData, setFormData] = useState({
    text: ''
  });
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');

  const {text} = formData;

  useEffect (() => {
    if (isError) {
      toast.error(message);
    }
    setIsError(false);
    setMessage('');
  }, [isError, message]);

  useEffect(() => {
    if (selected) {
      projectService.getProjectComments(selected.id)
      .then((comments) => {
        dispatch({type: 'GET', payload: comments});
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setIsError(true);
      }) 
    }  
  }, [dispatch, selected]);

  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await commentService.createComment(formData, selected.id);
      const {id, user_id, project_id, text, timestamp} = response;
      dispatch({type: 'CREATE', payload: {id, user_id, project_id, text, timestamp}});
      setFormData({text: ''});
    } catch(err) {
      setMessage(err.response.data.message);
      setIsError(true);
    }
  }


  return (
    <section className="comment-list">
      <div className="sidebar-header">
        <h3>Project Chat</h3>
      </div>

      {selected ? (
          <div className="comments">
            {comments.length > 0 ? (
              <div>
                {comments.map((comment) => (
                <CommentItem key={comment.id} comment={comment}></CommentItem>
              ))}
              </div>
            ) : (<p>no comments to show</p>)}
          </div>
        ) : (<p>select a project to show comments</p>)}
      
      <div className="comment-form">
        <form onSubmit={handleSubmit}>
          <input 
          type="text"
          id="text"
          name="text"
          value={text}
          placeholder="your message"
          onChange={handleChange} />
          <button type="submit">send</button>
        </form>
      </div>
    </section>
  );
}

export default CommentList;