import {useState, useEffect, useContext} from "react";
import ProjectContext from '../context/store/ProjectStore';
import projectService from '../features/projectService';
import {toast} from "react-toastify";
import {FaTimesCircle} from 'react-icons/fa';
import '../css/ProjectForm.css';

const CreateProjectForm = ({setIsOpen}) => {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });

  const [isSuccess, setIsSuccess] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  
  const {projects, selected, projectDispatch} = useContext(ProjectContext);

  const {name, description} = formData;

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
      const response = await projectService.createProject(formData);
      const {id, name, description, createdAt, managerId} = response;
      projectDispatch({type: 'CREATE', payload: {id, name, description, createdAt, managerId}});
      setMessage(response.message);
      setIsSuccess(true);
      setIsError(false);
      setIsLoading(false);
    } catch (err) {
      setMessage(err.response.data.message);
      setIsError(true);
      setIsSuccess(false);
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  }

  return (
    <div className="main-form-container">
      <section className="project-form-header">
        <h2>Create a project</h2>
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
            placeholder="Pick a name for your project" 
            onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <textarea
            id="description"
            name="description"
            rows="5"
            cols="50"
            value={description}
            placeholder="What is your project about?"
            onChange={handleChange}
            />
          </div>
          <button type="submit">Create Project</button>
        </form>
      </section>
    </div> 
  )
};

export default CreateProjectForm;