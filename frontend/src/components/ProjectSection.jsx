import {useState, useEffect, usereducer} from 'react';
import ProjectHeader from './ProjectHeader';
import '../css/ProjectHeader.css';

const ProjectSection = () => {
  const [isError, setIsError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {

  }, []);

  return (
    <ProjectHeader></ProjectHeader>
  )
}

export default ProjectSection;