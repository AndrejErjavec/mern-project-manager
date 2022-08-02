import {useState, useEffect, useContext} from 'react';
import ProjectContext from '../context/store/ProjectStore';
import '../css/ProjectHeader.css'

const ProjectHeader = () => {
  const {selected} = useContext(ProjectContext);


  return (
    <nav className="project-header">
      <div className="project-header-left">
        <h3>{selected ? selected.name : 'No project selected'}</h3>
        <p>{selected ? selected.description : ''}</p>
      </div>
    </nav>
  )
}

export default ProjectHeader;