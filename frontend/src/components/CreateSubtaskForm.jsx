import {useState, useContext, useEffect} from 'react';
import TaskContext from '../context/store/TaskStore';
import SubtaskContext from '../context/store/SubtaskStore';
import subtaskService from '../features/subtaskService';
import {toast} from "react-toastify";
import {FaTimesCircle} from 'react-icons/fa';

const CreateSubtaskForm = ({setFormOpen}) => {

  const [formData, setFormData] = useState({
    name: '',
    priority: 'low',
    completed: false
  });

  const {name, priority, completed} = formData;

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const {selected} = useContext(TaskContext);
  const {subtasks, dispatch} = useContext(SubtaskContext);

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
      const response = await subtaskService.createSubtask(formData, selected.id)
      const {id, task_id, name, priority, completed} = response;
      dispatch({type: 'CREATE', payload: {id, task_id, name, priority, completed}});
      handleClose();
    } catch (err) {
      setMessage(err.response.data.message);
      setIsSuccess(false);
      setIsError(true);
      setIsLoading(false);
    }  
  };

  const handleClose = () => {
    setFormOpen(false);
  };

  return (
    <div className="main-form-container">
      <section className="project-form-header">
        <h2>Create a subtask</h2>
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
            placeholder="Subtask name" 
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
    
}


export default CreateSubtaskForm;