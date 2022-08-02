import {useContext} from 'react';
import ProjectContext from '../context/store/ProjectStore';
import '../css/ProjectItem.css';

const ProjectItem = ({project}) => {

  const {dispatch} = useContext(ProjectContext);

  /*const setProject = () => {
    dispatch({type: 'SELECT', payload: project});
  }*/

  const selectProject = () => {
    dispatch({type: 'SELECT', payload: project});
  }

  return (
    <div className="project-item" onClick={selectProject}>
      {project.name}
    </div>
  )
}

export default ProjectItem;