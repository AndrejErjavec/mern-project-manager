import {useState, useEffect, useContext} from 'react';
import TaskContext from '../context/store/TaskStore';
import SubtaskContext from '../context/store/SubtaskStore';
import CreateSubtaskForm from './CreateSubtaskForm';
import AddUsersTaskForm from './AddUsersTaskForm';
import taskService from '../features/taskService';
import subtaskService from '../features/subtaskService';
import SubtaskItem from './SubtaskItem';
import UserAvatar from './UserAvatar';
import {toast} from "react-toastify";
import {FaArrowAltCircleLeft} from 'react-icons/fa';
import '../css/TaskView.css';

const TaskView = ({setTaskViewOpen}) => {
  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const [users, setUsers] = useState([]);

  const [isFormOpen, setFormOpen] = useState(false);
  const [usersFormOpen, setUsersFormOpen] = useState(false);

  const {selected} = useContext(TaskContext);
  const {subtasks, subtaskDispatch} = useContext(SubtaskContext);

  useEffect(() => {
    try {
      taskService.getSubtasks(selected.id)
      .then((subtasks) => {
        subtaskDispatch({type: 'GET', payload: subtasks});
      })
    } catch (err) {
      setMessage(err.response.data.message);
      setIsError(true);
    }
  }, [selected, subtaskDispatch]);

  useEffect(() => {
    taskService.getTaskUsers(selected.id)
    .then((users) => {
      setUsers(users);
    })
    .catch((err) => {
      setMessage(err.response.data.message);
      setIsError(true);
    })
  }, [selected]);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const handleClose = () => {
    setTaskViewOpen(false);
  }

  const openSubtaskForm = () => {
    setFormOpen(true);
  }

  const openUsersForm = () => {
    setUsersFormOpen(true);
  }

  const dueDate = selected.due_date;
  const date = new Date(dueDate).toLocaleDateString('sl-SI');

  return (
    <>
    <section className="task-view">
      <div className="task-header">
        <FaArrowAltCircleLeft onClick={handleClose} size="25px" className="back-btn"></FaArrowAltCircleLeft>
        <h3>Task: {selected.name}</h3>
        <p>{selected.description? (selected.description) : ('no description')}</p>
        <p>due: {date}</p>
        <div className="priority-display">
          <p>priority: </p>
        <div className={`priority-${selected.priority}`}>{selected.priority}</div>
        </div>
        <div className="task-users">
          <p>assigned users:</p>
          {users.length > 0 ? (
            <div className="task-user-list">
              {users.map((user) => (
                <div key={user.id} className="user-avatar-item">
                  <UserAvatar user={user}></UserAvatar>
                </div>
              ))}
            </div>
          ) : (<p>no users assigned yet</p>)}
        </div>
      </div>
      
      <div className="subtask-header">
        <h3>Subtasks</h3>
        <button onClick={openSubtaskForm}>New Subtask</button>
        <button onClick={openUsersForm}>Assign to users</button>
      </div>
      <div className="subtasks">
        {subtasks.length > 0 ? (
        <div className="subtask-list">
          {subtasks.map((subtask) => (
          <SubtaskItem key={subtask.id} subtask={subtask}></SubtaskItem>
          ))}
        </div>) : (<p>No subtasks</p>)}
      </div>
    </section>
    {isFormOpen && <CreateSubtaskForm setFormOpen={setFormOpen}></CreateSubtaskForm>}
    {usersFormOpen && <AddUsersTaskForm setIsOpen={setUsersFormOpen}></AddUsersTaskForm>}
    </>
  )
}

export default TaskView;