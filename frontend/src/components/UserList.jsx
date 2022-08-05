import { useState, useEffect, useContext } from "react";
import UserContext from '../context/store/UserStore';
import ProjectContext from '../context/store/ProjectStore';
import MemberContext from '../context/store/MemberStore';
import projectService from '../features/projectService';
import {toast} from "react-toastify";
import UserItem from './UserItem'
import '../css/UserList.css';

const UserList = () => {
  const {user} = useContext(UserContext);
  const {selected} = useContext(ProjectContext);


  /*const [formData, setFormData] = useState({
    text: ''
  });*/

  const {members, dispatch} = useContext(MemberContext);

  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');


  //const {text} = formData;

  useEffect (() => {
    if (isError) {
      toast.error(message);
    }
    setIsError(false);
    setMessage('');
  }, [isError, message]);

  useEffect(() => {
    if (selected) {
      projectService.getProjectUsers(selected.id)
      .then((members) => {
        dispatch({type: 'GET', payload: members});
        // dispatch({type: 'GET', payload: comments});
      })
      .catch((err) => {
        setMessage(err.response.data.message);
        setIsError(true);
      }) 
    }  
  }, [dispatch, selected]);


  /*const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  }*/

  /*const handleSubmit = async (e) => {
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
  }*/


  return (
    <section className="project-user-list">
      <div className="user-sidebar-header">
        <h3>Project Users</h3>
      </div>
      <div className="member-list">
        {selected ? (
        <div>
          {members.length > 0 ? (
            <div>
              {members.map((member) => (
              <UserItem key={member.id} user={member}></UserItem>
            ))}
            </div>
          ) : (<p>no users in this project</p>)}
        </div>
        ) : (<p>select a project to show members</p>)}
      </div>
      
      
      {/*<div className="comment-form">
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
      </div>*/}
    </section>
  );
}

export default UserList;