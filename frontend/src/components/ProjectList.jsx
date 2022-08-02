import { useState, useEffect, useContext } from "react";
import UserContext from '../context/store/UserStore';
import ProjectContext from '../context/store/ProjectStore';
import projectService from '../features/projectService';
import {toast} from "react-toastify";
import ProjectItem from './ProjectItem';
import CreateProjectForm from '../components/CreateProjectForm';
import '../css/ProjectList.css'

const ProjectList = () => {
  const {user} = useContext(UserContext);
  const {projects, dispatch} = useContext(ProjectContext);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  // is project form open?
  const [isFormOpen, setIsFormOpen] = useState(false);

  useEffect(() => {
    projectService.getUserProjects(user.id)
    .then((projects) => {
      dispatch({type: 'SET', payload: projects});
    })
    .catch((err) => {
      setMessage(err.message);
      setIsError(true);
    })
  }, [dispatch, user.id]);


  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  }, [isError, message]);

  const showForm = () => {
    setIsFormOpen(true);
  };


  return (
    <>
      <section className="project-sidebar">
        <div className="sidebar-header">
          <h2>My Projects</h2>
          <button onClick={showForm}>
          Create New Project
        </button>
        </div>
        {projects.length > 0 ? (
          <div className="projects">
            {projects.map((project) => (
              <ProjectItem key={project.id} project={project}></ProjectItem>
            ))}
          </div>
        ) : (<p>no projects to show</p>)}
      </section>
      {
        isFormOpen && <CreateProjectForm setIsOpen={setIsFormOpen}/>
      }
    </>
  )
}

export default ProjectList;