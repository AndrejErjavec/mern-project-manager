import {useState, useEffect, useContext} from "react";
import ProjectContext from '../context/store/ProjectStore';
import TaskContext from '../context/store/TaskStore';
import taskService from '../features/taskService';
import {toast} from "react-toastify";
import {FaTimesCircle} from 'react-icons/fa';

const CreateTaskForm = ({setIsOpen}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    dueDate: '',
    priority: 'low',
    completed: false
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {selected} = useContext(ProjectContext);
  const {tasks, taskDispatch} = useContext(TaskContext);

  const {name, description, dueDate, priority, completed} = formData;

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
    setMessage('');
    setIsLoading(false);
  }, [isError, isSuccess, message, isLoading]);


  const handleChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await taskService.createTask(formData, selected.id);
      const {id, project_id, name, description, due_date, priority, completed} = response;
      taskDispatch({type: 'CREATE', payload: {id, project_id, name, description, due_date, priority, completed}});
      setIsSuccess(true);
      setMessage(response.message);
    } catch (err) {
      console.log(err);
      if (err.response.data) {
        setMessage(err.response.data.message);
      }
      setIsSuccess(false);
      setIsError(true);
      setIsLoading(false);
    }  
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="main-form-container">
      <section className="project-form-header">
        <h2>Create a task</h2>
        <FaTimesCircle className="close-btn" onClick={handleClose}></FaTimesCircle>
      </section>
      <section className="project-form">
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <input 
            type="text"
            id="name"
            name="name"
            value={name}
            placeholder="Task name" 
            onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="dueDate">due date</label>
            <input 
            type="date"
            id="dueDate"
            name="dueDate"
            value={dueDate}
            onChange={handleChange} />
          </div>
          <div className="form-group">
            <textarea
            id="description"
            name="description"
            rows="5"
            cols="50"
            value={description}
            placeholder="Description"
            onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label htmlFor="priority">priority</label>
            <select name="priority" id="priority" onChange={handleChange}>
              <option value="low">low</option>
              <option value="normal">normal</option>
              <option value="important">important</option>
            </select>
          </div>
          <button type="submit">Create Task</button>
        </form>
      </section>
    </div> 
  )
};

export default CreateTaskForm;