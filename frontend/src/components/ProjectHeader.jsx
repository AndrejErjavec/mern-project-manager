import {useState, useEffect, usereducer} from 'react';

const ProjectHeader = () => {
  return (
    <nav className="project-header">
      <div className="project-header-left">
        <h3>Project name</h3>
        <button>New Task</button>
      </div>
      <section className="sorting">
        <p>sort by:</p>
        <ul>
          <li>priority</li>
          <li>due date</li>
          <li>completed</li>
        </ul>
      </section>
      
    </nav>
  )
}

export default ProjectHeader;