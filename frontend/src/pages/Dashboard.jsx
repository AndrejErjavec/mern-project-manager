import { useState, useEffect, useContext } from "react";
import UserContext from '../context/store/UserStore';
import ProjectContext from '../context/store/ProjectStore';
import {useNavigate} from 'react-router-dom';
import Header from '../components/Header';
import ProjectList from '../components/ProjectList';
import ProjectHeader from '../components/ProjectHeader';
import TaskList from '../components/TaskList';
import TaskView from '../components/TaskView';
import UserList from '../components/UserList';
import '../css/Dashboard.css';

const Dashboard = () => {
  const {user} = useContext(UserContext);
  const {projects, dispatch} = useContext(ProjectContext);
  const navigate = useNavigate();

  const [taskViewOpen, setTaskViewOpen] = useState(false);

  // removed  projects from dependency array
  useEffect(() => {
    
    if (!user) {
      navigate('/login');
    }
  }, [dispatch, navigate, projects, user]);


  if (!user) {
    return (
      <p>loading...</p>
    );
  }

  return (
    <div className="body">
      <Header user={user}></Header>
      <div className="project-content">
        <ProjectList></ProjectList>
        <div className="project-display">
          <ProjectHeader></ProjectHeader>
          <div className="krneki">
            <TaskList setTaskViewOpen={setTaskViewOpen}></TaskList>
            {taskViewOpen && <TaskView setTaskViewOpen={setTaskViewOpen}></TaskView>}
            <div className="users">
              <UserList></UserList>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard