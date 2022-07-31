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
  // const [projects, setProjects] = useState([]);
  const {projects, dispatch} = useContext(ProjectContext);
  const [isError, setIsError] = useState(false);
  const [message, setMessage] = useState('');
  // is project form open?
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    projectService.getUserProjects(user.id)
    .then((projects) => {
      dispatch({type: 'GET', payload: projects})
      //setProjects(projects);
    })
    .catch((err) => {
      setIsError(true);
      setMessage(err.message);
    })
  }, []);

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }
  });

  const showForm = () => {
    setIsOpen(true)
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
              <ProjectItem project={project} key={project.id}></ProjectItem>
            ))}
          </div>
        ) : (<p>no projects to show</p>)}
      </section>
      {
        isOpen && <CreateProjectForm setIsOpen={setIsOpen}/>
      }
    </>
  )
}

export default ProjectList;