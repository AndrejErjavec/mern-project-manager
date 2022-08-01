import { useState, useEffect, useContext } from "react";
import UserContext from '../context/store/UserStore';
import {useNavigate} from 'react-router-dom';
import Header from '../components/Header';
import ProjectList from '../components/ProjectList';
import ProjectSection from '../components/ProjectSection';
import ProjectHeader from '../components/ProjectHeader';
import '../css/Dashboard.css';

const Dashboard = () => {
  const {user} = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
    
  }, [navigate, user]);


  if (!user) {
    return (
      <p>loading...</p>
    );
  }

  return (
    <>
      <div className="body">
        <Header user={user}></Header>
        <div className="project-content">
          <ProjectList></ProjectList>
          <div className="project-display">
            <ProjectHeader></ProjectHeader>
            <div className="krneki">
              <div className="ticket"></div>
              <div className="users"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Dashboard