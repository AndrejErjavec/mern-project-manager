import '../css/ProjectItem.css';

const ProjectItem = ({project}) => {

  return (
    <div className="project-item">
      {project.name}
    </div>
  )
}

export default ProjectItem;