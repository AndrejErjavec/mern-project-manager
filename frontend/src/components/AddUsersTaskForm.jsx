import {useState, useContext, useEffect} from 'react';
import TaskContext from '../context/store/TaskStore';
import MemberContext from '../context/store/MemberStore';
import userService from '../features/userService';
import taskService from '../features/taskService';
import UserTicket from './UserTicket';
import {toast} from "react-toastify";
import {FaTimesCircle} from 'react-icons/fa';
import '../css/ProjectForm.css';

const AddUsersForm = ({setIsOpen}) => {
  const [selectedUsers, setSelectedUsers] = useState([]);
  //const {members} = useContext(MemberContext);
  const [users, setUsers] = useState([]);
  const {selected} = useContext(TaskContext);

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
      handleClose();
    }
    // reset state
    setIsError(false);
    setIsSuccess(false);
    setIsLoading(false);
    setMessage('');
  }, [isError, isSuccess, message]);

  useEffect(() => {
    if (selected) {
      setIsLoading(true);
    try {
      taskService.getUsersNotInTask(selected.id)
      .then((users) => {
        setUsers(users);
      })
      setIsLoading(false);
    } catch(err) {
      setMessage(err.response);
      console.log(err);
      setIsError(true);
    }
    }
    
    
  }, [selected]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const responses = await taskService.addMultipleUsers(selectedUsers, selected.id);
      // const [...users] = responses.map(response => response.user);
      setMessage('user(s) added');
      setIsSuccess(true);
    } catch(err) {
      setIsError(true);
      setMessage('something went wrong');
    }
  };

  const handleChange = (e) => {
    let list = [...selectedUsers];
    if (e.target.checked) {
      list = [...selectedUsers, e.target.value];
    }
    else {
      list.splice(selectedUsers.indexOf(e.target.value), 1);
    }
    setSelectedUsers(list);
  };


  const handleClose = () => {
    setIsOpen(false);
  }


  return (
    <div className="main-form-container">
      <section className="project-form-header">
        <div className="project-header-left">
          <h2>Assign task to users</h2>
        <p>Select users you want to add to the task</p>
        </div>
        <FaTimesCircle className="close-btn" onClick={handleClose}></FaTimesCircle>
      </section>
      {isLoading ? <p>Loading...</p> : <></>}
      <section className="project-form">
        {users.length > 0 ? (
          <form onSubmit={handleSubmit}>
            <div className="user-list">
              {users.map((user) => (
                <div key={user.id} className="user-select-item">
                  <div className="user-select-item-left">
                    <label htmlFor={user.id}><UserTicket user={user}></UserTicket></label>
                  </div>
                  <div className="user-select-item-right">
                    <input key={user.id} type="checkbox" name={user.id} value={user.id} onChange={handleChange}></input>
                  </div>
                </div>
              ))}
            </div>
          <button type="submit" className={selectedUsers.length > 0 ? `btn-enabled` : `btn-disabled`} disabled={selectedUsers.length > 0 ? false : true}>Add</button>
        </form>
        ) : (<p>no users available</p>)}
      </section>
    </div> 
  )
}

export default AddUsersForm;