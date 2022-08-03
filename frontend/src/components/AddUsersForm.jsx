import {useState, useContext, useEffect} from 'react';
import ProjectContext from '../context/store/ProjectStore';
import userService from '../features/userService';
import projectService from '../features/projectService';
import UserAvatar from './UserAvatar';
import {toast} from "react-toastify";
import {FaTimesCircle} from 'react-icons/fa';
import '../css/ProjectForm.css';

const AddUsersForm = ({setIsOpen}) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [users, setUsers] = useState([]);

  const {selected} = useContext(ProjectContext);

  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
    if (isSuccess) {
      toast.success(message);
    }
    // reset state
    setIsError(false);
    setIsSuccess(false);
    setIsLoading(false);
    setMessage('');
  })

  useEffect(() => {
    setIsLoading(true);
    try {
      projectService.getUsersNotInProject(selected.id)
      .then((users) => {
        setUsers(users);
      })
    } catch(err) {
      setMessage(err.response.data.message);
      setIsError(true);
      console.log(err);
    }
    
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleChange = (e) => {

  };

  const handleClose = () => {
    setIsOpen(false);
  }

  if (isLoading) {
    return (<p>loading...</p>)
  }

  return (
    <div className="main-form-container">
      <section className="project-form-header">
        <h2>Add users</h2>
        <FaTimesCircle className="close-btn" onClick={handleClose}></FaTimesCircle>
      </section>
      <section className="project-form">
        {users.length > 0 ? (
          <form onSubmit={handleSubmit}>
            {users.map((user) => (
              <div>
                <label htmlFor={user.id}><UserAvatar user={user}></UserAvatar><p>{user.first_name} {user.last_name}</p></label>
                <input key={user.id} type="checkbox" name={user.id} value={user.id}></input>
              </div>
            ))}
          <button type="submit">Add</button>
        </form>
        ) : (<p>no users available</p>)}
      </section>
    </div> 
  )
}

export default AddUsersForm;