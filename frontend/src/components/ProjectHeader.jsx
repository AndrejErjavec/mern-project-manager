import {useState, useEffect, useContext} from 'react';
import ProjectContext from '../context/store/ProjectStore';
import AddUsersForm from './AddUsersForm';
import '../css/ProjectHeader.css'

const ProjectHeader = () => {
  const {selected} = useContext(ProjectContext);
  const [isFormOpen, setFormOpen] = useState(false);

  const showForm = () => {
    setFormOpen(true);
  };

  return (
    <>
    <nav className="project-header">
      <div className="project-header-left">
        <h3>{selected ? selected.name : 'No project selected'}</h3>
        <p>{selected ? selected.description : 'select or create a project'}</p>
      </div>
      <div className="project-header-right">
        {selected && <button onClick={showForm}>Add user to project</button>}
      </div>
    </nav>

    {isFormOpen && <AddUsersForm setIsOpen={setFormOpen}/>}
    </>
  )
}

export default ProjectHeader;